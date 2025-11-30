"use client";

import { useState } from "react";
import { ChefHat, Lock, Check, Sparkles, Clock, Users, Star, Calculator, ShoppingCart, Calendar, TrendingUp, Heart, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStripe } from "@/lib/stripe";

interface Recipe {
  id: number;
  title: string;
  description: string;
  time: string;
  servings: number;
  difficulty: string;
  calories: number;
  ingredients: string[];
  steps: string[];
  image: string;
  isPremium: boolean;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Smoothie Bowl de Frutas Vermelhas",
    description: "Delicioso e nutritivo, perfeito para começar o dia com energia",
    time: "10 min",
    servings: 2,
    difficulty: "Fácil",
    calories: 280,
    ingredients: [
      "1 banana congelada",
      "1 chávena de frutas vermelhas congeladas",
      "1/2 chávena de iogurte natural",
      "2 colheres de sopa de mel",
      "Granola para decorar",
      "Frutas frescas a gosto"
    ],
    steps: [
      "Coloque a banana, frutas vermelhas e iogurte no liquidificador",
      "Bata até obter uma consistência cremosa",
      "Transfira para uma tigela",
      "Decore com granola e frutas frescas",
      "Sirva imediatamente"
    ],
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 2,
    title: "Salada de Quinoa Mediterrânea",
    description: "Rica em proteínas e sabores frescos do mediterrâneo",
    time: "25 min",
    servings: 4,
    difficulty: "Médio",
    calories: 320,
    ingredients: [
      "1 chávena de quinoa",
      "Tomate cereja cortado ao meio",
      "Pepino em cubos",
      "Azeitonas pretas",
      "Queijo feta em cubos",
      "Azeite e limão para temperar"
    ],
    steps: [
      "Cozinhe a quinoa conforme instruções da embalagem",
      "Deixe esfriar completamente",
      "Misture todos os vegetais numa tigela grande",
      "Adicione a quinoa fria",
      "Tempere com azeite, limão, sal e pimenta"
    ],
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 3,
    title: "Panquecas de Aveia e Banana",
    description: "Sem farinha refinada, apenas ingredientes naturais",
    time: "15 min",
    servings: 2,
    difficulty: "Fácil",
    calories: 250,
    ingredients: [
      "2 bananas maduras",
      "1 chávena de aveia",
      "2 ovos",
      "1 colher de chá de canela",
      "Mel para servir",
      "Frutas frescas para decorar"
    ],
    steps: [
      "Amasse as bananas num recipiente",
      "Adicione os ovos e misture bem",
      "Junte a aveia e a canela",
      "Aqueça uma frigideira antiaderente",
      "Cozinhe pequenas porções até dourar dos dois lados"
    ],
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 4,
    title: "Sopa Detox de Legumes",
    description: "Leve, nutritiva e cheia de vitaminas",
    time: "30 min",
    servings: 4,
    difficulty: "Fácil",
    calories: 180,
    ingredients: [
      "2 cenouras",
      "1 courgette",
      "1 cebola",
      "2 dentes de alho",
      "Espinafres frescos",
      "Caldo de legumes"
    ],
    steps: [
      "Refogue a cebola e o alho",
      "Adicione os legumes cortados",
      "Cubra com caldo de legumes",
      "Cozinhe por 20 minutos",
      "Adicione os espinafres no final"
    ],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 5,
    title: "Wrap de Frango com Abacate",
    description: "Proteína e gorduras boas numa refeição completa",
    time: "20 min",
    servings: 2,
    difficulty: "Médio",
    calories: 420,
    ingredients: [
      "2 tortilhas integrais",
      "200g de peito de frango",
      "1 abacate maduro",
      "Alface e tomate",
      "Iogurte grego",
      "Especiarias a gosto"
    ],
    steps: [
      "Tempere e grelhe o frango",
      "Corte o frango em tiras",
      "Amasse o abacate com limão",
      "Monte o wrap com todos os ingredientes",
      "Enrole e corte ao meio"
    ],
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 6,
    title: "Bolo de Cenoura Fit",
    description: "Sobremesa saudável sem açúcar refinado",
    time: "45 min",
    servings: 8,
    difficulty: "Médio",
    calories: 210,
    ingredients: [
      "3 cenouras médias",
      "3 ovos",
      "1/2 chávena de mel",
      "2 chávenas de farinha integral",
      "1 colher de fermento",
      "Canela a gosto"
    ],
    steps: [
      "Bata as cenouras com os ovos e mel",
      "Adicione a farinha e o fermento",
      "Misture delicadamente",
      "Despeje numa forma untada",
      "Asse a 180°C por 35-40 minutos"
    ],
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 7,
    title: "Omelete de Espinafres e Queijo",
    description: "Pequeno-almoço rico em proteína",
    time: "12 min",
    servings: 1,
    difficulty: "Fácil",
    calories: 290,
    ingredients: [
      "3 ovos",
      "Espinafres frescos",
      "Queijo ralado",
      "Sal e pimenta"
    ],
    steps: [
      "Bata os ovos",
      "Refogue os espinafres",
      "Despeje os ovos na frigideira",
      "Adicione queijo e dobre"
    ],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 8,
    title: "Salada de Grão-de-Bico",
    description: "Proteína vegetal e fibras",
    time: "15 min",
    servings: 3,
    difficulty: "Fácil",
    calories: 260,
    ingredients: [
      "1 lata de grão-de-bico",
      "Tomate",
      "Pepino",
      "Cebola roxa",
      "Azeite e limão"
    ],
    steps: [
      "Escorra o grão-de-bico",
      "Corte os vegetais",
      "Misture tudo",
      "Tempere a gosto"
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 9,
    title: "Iogurte com Granola Caseira",
    description: "Lanche saudável e energético",
    time: "5 min",
    servings: 1,
    difficulty: "Fácil",
    calories: 310,
    ingredients: [
      "Iogurte natural",
      "Granola",
      "Mel",
      "Frutas frescas"
    ],
    steps: [
      "Coloque o iogurte numa tigela",
      "Adicione granola",
      "Decore com frutas",
      "Regue com mel"
    ],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop",
    isPremium: false
  },
  {
    id: 10,
    title: "Salmão Grelhado com Legumes",
    description: "Ómega-3 e nutrientes essenciais",
    time: "25 min",
    servings: 2,
    difficulty: "Médio",
    calories: 380,
    ingredients: [
      "2 postas de salmão",
      "Brócolos",
      "Cenoura",
      "Limão",
      "Azeite"
    ],
    steps: [
      "Tempere o salmão",
      "Grelhe por 4-5 min de cada lado",
      "Cozinhe os legumes no vapor",
      "Sirva com limão"
    ],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
    isPremium: true
  },
  {
    id: 11,
    title: "Risoto de Cogumelos",
    description: "Cremoso e reconfortante",
    time: "35 min",
    servings: 4,
    difficulty: "Médio",
    calories: 340,
    ingredients: [],
    steps: [],
    image: "https://images.unsplash.com/photo-1476124369491-c4ca6e0e3ffc?w=600&h=400&fit=crop",
    isPremium: true
  },
  {
    id: 12,
    title: "Tacos de Peixe",
    description: "Sabor mexicano saudável",
    time: "20 min",
    servings: 3,
    difficulty: "Médio",
    calories: 350,
    ingredients: [],
    steps: [],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop",
    isPremium: true
  }
];

const testimonials = [
  {
    name: "Maria Silva",
    text: "Perdi 5kg em 2 meses usando as receitas! São deliciosas e fáceis de fazer.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    name: "João Santos",
    text: "Compro menos e como melhor. As listas de compras automáticas são incríveis!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    name: "Ana Costa",
    text: "Finalmente consigo comer saudável sem passar horas na cozinha. Recomendo!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  }
];

const weeklyMealPlan = {
  monday: { breakfast: "Smoothie Bowl", lunch: "Salada de Quinoa", dinner: "Wrap de Frango" },
  tuesday: { breakfast: "Panquecas de Aveia", lunch: "Sopa Detox", dinner: "Salmão Grelhado" },
  wednesday: { breakfast: "Omelete", lunch: "Salada de Grão", dinner: "Risoto de Cogumelos" },
  thursday: { breakfast: "Iogurte com Granola", lunch: "Wrap de Frango", dinner: "Tacos de Peixe" },
  friday: { breakfast: "Smoothie Bowl", lunch: "Quinoa Mediterrânea", dinner: "Sopa Detox" }
};

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showCalorieCalc, setShowCalorieCalc] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  
  // Calculadora de calorias
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [calorieResult, setCalorieResult] = useState<number | null>(null);

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (w && h && a) {
      // Fórmula de Harris-Benedict
      let bmr = gender === "male" 
        ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
        : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
      
      setCalorieResult(Math.round(bmr * 1.55)); // Atividade moderada
    }
  };

  const handleCheckout = async (plan: string) => {
    setLoadingPlan(plan);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Erro ao criar sessão de checkout');
        setLoadingPlan(null);
      }
    } catch (error) {
      console.error('Erro:', error);
      setLoadingPlan(null);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const freeRecipes = recipes.filter(r => !r.isPremium);
  const premiumRecipes = recipes.filter(r => r.isPremium);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
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
          <Button 
            onClick={() => setShowPremiumModal(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Seja Premium
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
          🎁 10 receitas grátis + ferramentas gratuitas!
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Receitas Saudáveis com
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Ingredientes de Casa</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Descubra receitas deliciosas e nutritivas usando apenas ingredientes que já tem na sua cozinha
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>Receitas rápidas</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Para toda família</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-600" />
            <span>100% saudável</span>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="container mx-auto px-4 pb-12">
        <h3 className="text-2xl font-bold text-center mb-8">🎁 Ferramentas Gratuitas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-300"
            onClick={() => setShowCalorieCalc(true)}
          >
            <CardHeader>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Calculadora de Calorias</CardTitle>
              <CardDescription>Descubra suas necessidades diárias</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-300"
            onClick={() => setShowShoppingList(true)}
          >
            <CardHeader>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Lista de Compras</CardTitle>
              <CardDescription>Automática para suas receitas</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-300"
            onClick={() => setShowMealPlan(true)}
          >
            <CardHeader>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Plano Semanal Grátis</CardTitle>
              <CardDescription>Organize suas refeições</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Free Recipes Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">🎁 Receitas Gratuitas ({freeRecipes.length})</h3>
          <Badge className="bg-emerald-600 text-white">Acesso Total</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeRecipes.map((recipe) => (
            <Card 
              key={recipe.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-emerald-200"
              onClick={() => handleRecipeClick(recipe)}
            >
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-emerald-600 text-white">
                  🎁 Grátis
                </Badge>
                <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
                  {recipe.calories} kcal
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                  {recipe.title}
                </CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {recipe.servings} porções
                </span>
                <Badge variant="outline" className="text-xs">
                  {recipe.difficulty}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Premium Recipes Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">✨ Receitas Premium</h3>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <Lock className="w-3 h-3 mr-1" />
            Exclusivo
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumRecipes.map((recipe) => (
            <Card 
              key={recipe.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-amber-200 relative"
              onClick={() => setShowPremiumModal(true)}
            >
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 blur-sm"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-white font-semibold">Premium</p>
                  </div>
                </div>
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Lock className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">
                  {recipe.title}
                </CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {recipe.servings} porções
                </span>
                <Badge variant="outline" className="text-xs">
                  {recipe.difficulty}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-emerald-100 to-teal-100 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">⭐ O Que Dizem Nossos Utilizadores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-gray-700">
                    "{testimonial.text}"
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-8 text-gray-700">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold">5.000+</p>
                  <p className="text-sm">Utilizadores Ativos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm">Satisfação</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="text-2xl font-bold">4.9/5</p>
                  <p className="text-sm">Avaliação Média</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedRecipe.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedRecipe.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex gap-4 my-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedRecipe.time}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedRecipe.servings} porções
                </Badge>
                <Badge variant="outline">
                  {selectedRecipe.difficulty}
                </Badge>
                <Badge className="bg-blue-600 text-white">
                  {selectedRecipe.calories} kcal
                </Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-emerald-700">Ingredientes</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-emerald-700">Modo de Preparo</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Calorie Calculator Modal */}
      <Dialog open={showCalorieCalc} onOpenChange={setShowCalorieCalc}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">Calculadora de Calorias</DialogTitle>
            <DialogDescription className="text-center">
              Descubra suas necessidades calóricas diárias
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div>
              <Label>Peso (kg)</Label>
              <Input 
                type="number" 
                placeholder="70" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <Label>Altura (cm)</Label>
              <Input 
                type="number" 
                placeholder="170" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <Label>Idade</Label>
              <Input 
                type="number" 
                placeholder="30" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <Label>Sexo</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  variant={gender === "female" ? "default" : "outline"}
                  onClick={() => setGender("female")}
                  className="flex-1"
                >
                  Feminino
                </Button>
                <Button
                  variant={gender === "male" ? "default" : "outline"}
                  onClick={() => setGender("male")}
                  className="flex-1"
                >
                  Masculino
                </Button>
              </div>
            </div>

            <Button 
              onClick={calculateCalories}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600"
            >
              Calcular
            </Button>

            {calorieResult && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl text-center border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Suas necessidades diárias:</p>
                <p className="text-4xl font-bold text-blue-600">{calorieResult}</p>
                <p className="text-sm text-gray-600 mt-1">calorias/dia</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Shopping List Modal */}
      <Dialog open={showShoppingList} onOpenChange={setShowShoppingList}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">Lista de Compras Automática</DialogTitle>
            <DialogDescription className="text-center">
              Ingredientes para as receitas gratuitas
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-4 max-h-96 overflow-y-auto">
            {[
              "Bananas", "Frutas vermelhas congeladas", "Iogurte natural", "Mel",
              "Granola", "Quinoa", "Tomate cereja", "Pepino", "Azeitonas",
              "Queijo feta", "Aveia", "Ovos", "Canela", "Cenouras",
              "Courgette", "Cebola", "Alho", "Espinafres", "Caldo de legumes",
              "Tortilhas integrais", "Peito de frango", "Abacate", "Alface",
              "Farinha integral", "Fermento", "Grão-de-bico", "Limão", "Azeite"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Check className="w-5 h-5 text-purple-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Exportar Lista
          </Button>
        </DialogContent>
      </Dialog>

      {/* Meal Plan Modal */}
      <Dialog open={showMealPlan} onOpenChange={setShowMealPlan}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">Plano Alimentar Semanal Grátis</DialogTitle>
            <DialogDescription className="text-center">
              Organize suas refeições da semana
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {Object.entries(weeklyMealPlan).map(([day, meals], index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{
                    day === 'monday' ? 'Segunda-feira' :
                    day === 'tuesday' ? 'Terça-feira' :
                    day === 'wednesday' ? 'Quarta-feira' :
                    day === 'thursday' ? 'Quinta-feira' : 'Sexta-feira'
                  }</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Pequeno-almoço</Badge>
                    <span className="text-sm">{meals.breakfast}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Almoço</Badge>
                    <span className="text-sm">{meals.lunch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Jantar</Badge>
                    <span className="text-sm">{meals.dinner}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
            <p className="text-sm text-center text-gray-700">
              💡 <strong>Dica:</strong> Com o plano Premium, crie planos personalizados para seus objetivos!
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <DialogTitle className="text-3xl text-center">
              Desbloqueie Todas as Receitas
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Escolha o plano ideal para você
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="monthly" className="my-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
              <TabsTrigger value="annual">Anual</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <Card className="border-2 border-gray-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-bold">€9,99</CardTitle>
                  <CardDescription>por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Acesso ilimitado a todas as receitas",
                      "Novas receitas semanais",
                      "Planos alimentares personalizados",
                      "Lista de compras automática",
                      "Calculadora nutricional avançada",
                      "Suporte prioritário"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6"
                    onClick={() => handleCheckout('monthly')}
                    disabled={loadingPlan === 'monthly'}
                  >
                    {loadingPlan === 'monthly' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Começar Agora'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quarterly">
              <Card className="border-2 border-emerald-500 relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white">
                  Economize 16%
                </Badge>
                <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-bold">€24,99</CardTitle>
                  <CardDescription>por 3 meses (€8,33/mês)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Tudo do plano mensal",
                      "16% de desconto",
                      "Acesso a receitas exclusivas",
                      "E-book de receitas grátis",
                      "Comunidade exclusiva",
                      "Sem compromisso"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6"
                    onClick={() => handleCheckout('quarterly')}
                    disabled={loadingPlan === 'quarterly'}
                  >
                    {loadingPlan === 'quarterly' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Escolher Trimestral'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="annual">
              <Card className="border-2 border-amber-500 relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  🔥 Melhor Oferta - 25% OFF
                </Badge>
                <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-bold">€89,99</CardTitle>
                  <CardDescription>por ano (€7,50/mês)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Tudo dos planos anteriores",
                      "25% de desconto",
                      "Receitas personalizadas ilimitadas",
                      "Acesso vitalício a atualizações",
                      "Kit de e-books premium",
                      "Certificado de conclusão"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-amber-600" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 text-lg"
                    onClick={() => handleCheckout('annual')}
                    disabled={loadingPlan === 'annual'}
                  >
                    {loadingPlan === 'annual' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Escolher Anual
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-center text-sm text-gray-600 mb-4">
              ✅ Acesso imediato a todas as funcionalidades premium
            </p>
            <p className="text-center text-xs text-gray-500">
              Pagamento seguro • Cancele quando quiser • Sem taxas ocultas
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Receitas Caseiras</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Transforme sua cozinha num lugar de saúde e sabor
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Receitas Caseiras. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
