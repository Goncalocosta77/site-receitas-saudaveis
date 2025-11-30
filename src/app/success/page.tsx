"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Sparkles, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de pagamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando seu pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Receitas Caseiras
              </h1>
              <p className="text-xs text-gray-600">Saudável e Delicioso</p>
            </div>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-2xl w-full border-2 border-emerald-200 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-full">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold mb-4">
              Pagamento Confirmado! 🎉
            </CardTitle>
            <CardDescription className="text-lg">
              Bem-vindo ao Receitas Caseiras Premium
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                O que você desbloqueou:
              </h3>
              <ul className="space-y-3">
                {[
                  "Acesso ilimitado a todas as receitas premium",
                  "Novas receitas exclusivas toda semana",
                  "Planos alimentares personalizados",
                  "Lista de compras automática avançada",
                  "Calculadora nutricional completa",
                  "Suporte prioritário 24/7",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {sessionId && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>ID da Transação:</strong> {sessionId}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Guarde este ID para referência futura
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6 text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explorar Receitas Premium
                </Button>
              </Link>

              <p className="text-center text-sm text-gray-600">
                Um email de confirmação foi enviado para você
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Receitas Caseiras. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
