import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    // Definir preços baseados no plano
    const prices: { [key: string]: { amount: number; name: string } } = {
      monthly: { amount: 999, name: 'Plano Mensal Premium' },
      quarterly: { amount: 2499, name: 'Plano Trimestral Premium' },
      annual: { amount: 8999, name: 'Plano Anual Premium' },
    };

    const selectedPrice = prices[plan];

    if (!selectedPrice) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: selectedPrice.name,
              description: 'Acesso completo a todas as receitas premium',
            },
            unit_amount: selectedPrice.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Erro detalhado ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento', details: error.message },
      { status: 500 }
    );
  }
}
