import ContractGenerator from '@/components/contract-generator';

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Generador de Contratos
          </h1>
          <p className="text-gray-600">
            Genera contratos de préstamos para empresas de forma rápida y sencilla
          </p>
        </div>
        
        <ContractGenerator />
      </div>
    </div>
  );
}
