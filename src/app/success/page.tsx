"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Aqui você pode fazer uma chamada para verificar o status do pagamento
      setTimeout(() => setLoading(false), 1000);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processando seu pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 border-emerald-200 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-full">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold mb-2">
            Pagamento Confirmado! 🎉
          </CardTitle>
          <CardDescription className="text-lg">
            Bem-vindo ao Receitas Caseiras Premium
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              O que você desbloqueou:
            </h3>
            <ul className="space-y-3">
              {[
                "Acesso ilimitado a todas as receitas premium",
                "Novas receitas exclusivas toda semana",
                "Planos alimentares personalizados",
                "Lista de compras automática avançada",
                "Calculadora nutricional completa",
                "Suporte prioritário da nossa equipe",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
            <p className="text-sm text-center text-gray-700">
              📧 Enviamos um email de confirmação com todos os detalhes da sua assinatura
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6"
            >
              <Link href="/">
                <Sparkles className="w-5 h-5 mr-2" />
                Explorar Receitas Premium
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            ID da Sessão: {sessionId}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
