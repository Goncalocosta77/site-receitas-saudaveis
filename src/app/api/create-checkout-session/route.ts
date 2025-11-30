import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    // Inicializar Stripe dentro da função para evitar erro durante build
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe não configurado' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });

    const { priceId, plan } = await req.json();

    // Definir preços e nomes dos planos
    const planDetails: Record<string, { amount: number; name: string; interval: string }> = {
      monthly: { amount: 999, name: 'Plano Mensal', interval: 'month' },
      quarterly: { amount: 2499, name: 'Plano Trimestral (3 meses)', interval: 'month' },
      annual: { amount: 8999, name: 'Plano Anual', interval: 'year' },
    };

    const selectedPlan = planDetails[plan as keyof typeof planDetails];

    if (!selectedPlan) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: selectedPlan.name,
              description: 'Acesso completo a todas as receitas premium',
            },
            unit_amount: selectedPlan.amount,
            recurring: plan === 'annual' 
              ? { interval: 'year' }
              : { interval: 'month', interval_count: plan === 'quarterly' ? 3 : 1 },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      metadata: {
        plan: plan,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('Erro ao criar sessão:', err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
