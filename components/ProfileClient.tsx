"use client";
import React, { useState } from "react";
import { usePyme } from "@/hooks/usePyme";
import { useUser } from "@/hooks/useUser";
import {
  Building2,
  Mail,
  Phone,
  User,
  TrendingUp,
  FileText,
  Download,
  Eye,
  Upload,
  Edit2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";
import Link from "next/link";

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [isEditing, setIsEditing] = useState(false);

  const { pyme, loading } = usePyme();
  const { data: user, isLoading: loadingUser } = useUser();

  const contactUser = loadingUser
    ? { nombre: "---", apellido: "---", email: "---", role: "---" }
    : {
      nombre: user!.nombre,
      apellido: user!.apellido,
      email: user!.email,
      role: user!.role,
    };

  /* ----------  Mientras llega la data  ---------- */
  const companyData = loading
    ? {
      legalName: "Empresa",
      tradeName: "---",
      cuit: "00-00000000-0",
      industry: "---",
      address: "---",
      city: "---",
      province: "---",
      phone: "---",
      email: "---",
      website: "---",
      yearsInBusiness: "0",
      employees: "0",
      annualRevenue: 0,
    }
    : {
      legalName: pyme!.company_name,
      tradeName: pyme!.company_name,
      cuit: pyme!.cuil_cuit,
      industry: pyme!.industry,
      address: `${pyme!.legal_address}, ${pyme!.city}, ${pyme!.local_state}`,
      city: pyme!.city,
      province: pyme!.local_state,
      phone: pyme!.phone,
      email: pyme!.email,
      website: pyme!.company_name.toLowerCase().replace(/\s/g, ""),
      yearsInBusiness: pyme!.merch_years,
      employees: pyme!.amount_employees,
      annualRevenue: pyme!.annual_billing_estimated,
    };


  // const companyData = {
  //   legalName: "Comercial López S.R.L.",
  //   tradeName: "López Distribuidora",
  //   cuit: "30-12345678-9",
  //   industry: "Comercio",
  //   address: "Av. Corrientes 1234, Piso 5",
  //   city: "Buenos Aires",
  //   province: "CABA",
  //   phone: "+54 11 4567-8900",
  //   email: "contacto@comerciallopez.com",
  //   website: "www.comerciallopez.com.ar",
  //   yearsInBusiness: 7,
  //   employees: 28,
  //   annualRevenue: 3500000,
  // };

  const documents = [
    {
      id: 1,
      name: "DNI Representante Legal",
      type: "Identificación",
      date: "2024-01-15",
      status: "approved",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Constancia AFIP",
      type: "Fiscal",
      date: "2024-09-20",
      status: "approved",
      size: "580 KB",
    },
    {
      id: 3,
      name: "Balance 2023",
      type: "Contable",
      date: "2024-05-10",
      status: "approved",
      size: "1.2 MB",
    },
    {
      id: 4,
      name: "Balance 2024",
      type: "Contable",
      date: "2024-10-05",
      status: "pending",
      size: "1.1 MB",
    },
    {
      id: 5,
      name: "Resúmenes Bancarios",
      type: "Bancario",
      date: "2024-10-15",
      status: "approved",
      size: "3.8 MB",
    },
  ];

  const loans = [
    {
      id: "SOL-2025-0123",
      amount: 500000,
      status: "active",
      date: "2025-05-01",
      purpose: "Capital de Trabajo",
    },
    {
      id: "SOL-2024-0456",
      amount: 300000,
      status: "completed",
      date: "2024-01-15",
      purpose: "Equipamiento",
    },
    {
      id: "SOL-2023-0789",
      amount: 250000,
      status: "completed",
      date: "2023-06-20",
      purpose: "Expansión",
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="navbar border-b border-slate-500/50  shadow-lg">
        <div className="flex-1">
          <h1 className="text-2xl font-bold ml-4">Mi Perfil</h1>
        </div>
        <div className="flex-none">
          <Link href={"/"} className="btn btn-ghost">
            ← Volver
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="card  dark:text-white dark:bg-base-100 rounded-lg shadow-xl">
              <div className="card-body   rounded-t-2xl">
                <div className="flex flex-col items-center">
                  <div className="avatar placeholder mb-4 ">
                    <Building2 className="w-10 h-10 m-auto" />
                  </div>
                  <h2 className="card-title text-center text-foreground">
                    {companyData.legalName}
                  </h2>
                  <p className="text-sm opacity-90 text-foreground">
                    {companyData.tradeName}
                  </p>
                  <div className="badge badge-ghost mt-2">
                    CUIT: {companyData.cuit}
                  </div>
                </div>
              </div>

              <div className="card-body ">
                <div className="space-y-4 ">
                  <div>
                    <p className="text-xs opacity-60">Rubro</p>
                    <p className="font-semibold">{companyData.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60">Antigüedad</p>
                    <p className="font-semibold">
                      {companyData.yearsInBusiness} años
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60">Empleados</p>
                    <p className="font-semibold">{companyData.employees}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60">Facturación Anual</p>
                    <p className="font-semibold">
                      ${(companyData.annualRevenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>

                <div className="divider divider-accent"></div>

                <div className="alert alert-success">
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center gap-5">
                      <span className="text-sm font-semibold">
                        Score Crediticio
                      </span>
                      <span className="text-2xl font-bold">750</span>
                    </div>
                    <progress
                      className="progress progress-success mt-2"
                      value="83"
                      max="100"
                    ></progress>
                    <span className="text-xs mt-1">Excelente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className=" mb-6 space-x-4 p-2 ">
              <a
                className={`py-4 px-1 border-b-2 hover:cursor-pointer font-medium text-sm transition-colors ${activeTab === "company"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent  hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("company")}
              >
                Datos de la Empresa
              </a>
              <a
                className={`py-4 px-1 border-b-2 hover:cursor-pointer font-medium text-sm transition-colors ${activeTab === "contacts"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent  hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("contacts")}
              >
                Contactos
              </a>
              <a
                className={`py-4 px-1 border-b-2 hover:cursor-pointer font-medium text-sm transition-colors ${activeTab === "documents"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent  hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("documents")}
              >
                Documentos
              </a>
              <a
                className={`py-4 px-1 border-b-2 hover:cursor-pointer font-medium text-sm transition-colors ${activeTab === "loans"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent  hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("loans")}
              >
                Préstamos
              </a>
            </div>

            {/* Company Tab */}
            {activeTab === "company" && (
              <div className="card dark:bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title">Información de la Empresa</h2>
                    {!isEditing ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setIsEditing(false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setIsEditing(false)}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold mb-4">Datos Básicos</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text">Razón Social:</span>
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              className="input input-bordered"
                              defaultValue={companyData.legalName}
                            />
                          ) : (
                            <p className="py-2">{companyData.legalName}</p>
                          )}
                        </div>
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text">Nombre Comercial:</span>
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              className="input input-bordered"
                              defaultValue={companyData.tradeName}
                            />
                          ) : (
                            <p className="py-2">{companyData.tradeName}</p>
                          )}
                        </div>
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text">CUIT:</span>
                          </label>
                          <p className="py-2">{companyData.cuit}</p>
                        </div>
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text">Rubro:</span>
                          </label>
                          <p className="py-2">{companyData.industry}</p>
                        </div>
                      </div>
                    </div>

                    <div className="divider divider-accent"></div>

                    <div>
                      <h3 className="font-bold mb-4">Contacto</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Teléfono:
                            </span>
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              className="input input-bordered"
                              defaultValue={companyData.phone}
                            />
                          ) : (
                            <p className="py-2">{companyData.phone}</p>
                          )}
                        </div>
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email:
                            </span>
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              className="input input-bordered"
                              defaultValue={companyData.email}
                            />
                          ) : (
                            <p className="py-2">{companyData.email}</p>
                          )}
                        </div>
                        <div className="form-control flex items-center gap-2  md:col-span-2">
                          <label className="label">
                            <span className="label-text flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Sitio Web:
                            </span>
                          </label>
                          {isEditing ? (
                            <input
                              type="url"
                              className="input input-bordered"
                              defaultValue={companyData.website}
                            />
                          ) : (
                            <a
                              href={`https://${companyData.website}`}
                              className="link link-primary py-2"
                            >
                              {companyData.website}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="divider divider-accent"></div>

                    <div>
                      <h3 className="font-bold mb-4">Dirección</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="form-control flex items-center gap-2 md:col-span-2">
                          <label className="label">
                            <span className="label-text">Dirección</span>
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              className="input input-bordered"
                              defaultValue={companyData.address}
                            />
                          ) : (
                            <p className="py-2">{companyData.address}</p>
                          )}
                        </div>
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text">Ciudad</span>
                          </label>
                          <p className="py-2">{companyData.city}</p>
                        </div>
                        <div className="form-control flex items-center gap-2">
                          <label className="label">
                            <span className="label-text">Provincia</span>
                          </label>
                          <p className="py-2">{companyData.province}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <div className="space-y-6">
                <div className="card dark:bg-base-100  shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Representante Legal
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm opacity-80">Nombre:</p>
                        <p className="font-semibold">{contactUser.nombre} {contactUser.apellido}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Cargo: </p>
                        <p className="font-semibold">Gerente General</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Email:</p>
                        <p className="font-semibold">
                          {contactUser.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Teléfono:</p>
                        <p className="font-semibold">{companyData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className='card bg-secondary text-secondary-content shadow-xl'>
                  <div className='card-body'>
                    <h2 className='card-title flex items-center gap-2'>
                      <FileText className='w-5 h-5' />
                      Contador
                    </h2>
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                      <div>
                        <p className='text-sm opacity-80'>Nombre</p>
                        <p className='font-semibold'>María Fernández</p>
                      </div>
                      <div>
                        <p className='text-sm opacity-80'>Email</p>
                        <p className='font-semibold'>
                          contabilidad@comerciallopez.com
                        </p>
                      </div>
                      <div>
                        <p className='text-sm opacity-80'>Teléfono</p>
                        <p className='font-semibold'>+54 11 5555-5678</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div className="card dark:bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title">Documentos</h2>
                    <button className="btn btn-primary btn-sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir
                    </button>
                  </div>

                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4  rounded-lg  hover:bg-slate-500/20 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="avatar placeholder">
                            {/* <div className='bg-base-100  rounded-lg w-12'>
                            </div> */}
                            <FileText className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{doc.name}</p>
                            </div>
                            <p className="text-xs opacity-70">
                              {doc.type} • {doc.date} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-ghost   btn-sm btn-circle">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="btn btn-ghost   btn-sm btn-circle">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="alert alert-warning mt-6">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">
                      Tu Constancia AFIP vence el 31/12/2025. Recuerda
                      renovarla.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Loans Tab */}
            {activeTab === "loans" && (
              <div className="card dark:bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title mb-6">Historial de Préstamos</h2>

                  <div className="space-y-4">
                    {loans.map((loan) => (
                      <div key={loan.id} className="card  shadow">
                        <div className="card-body">
                          <div className="flex items-center justify-between   mb-3">
                            <div className="flex items-center  gap-3">
                              <h3 className="font-bold">{loan.id}</h3>
                              <div
                                className={`badge ${loan.status === "active"
                                    ? "badge-info"
                                    : "badge-success"
                                  }`}
                              >
                                {loan.status === "active"
                                  ? "Activo"
                                  : "Completado"}
                              </div>
                            </div>
                            <p className="text-sm opacity-70  max-w-fit">
                              {loan.date}
                            </p>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs opacity-70">Monto</p>
                              <p className="text-lg font-bold text-primary">
                                ${loan.amount.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs opacity-70">Destino</p>
                              <p className="font-semibold">{loan.purpose}</p>
                            </div>
                            <div className="flex items-end justify-end">
                              <button className="btn btn-sm btn-ghost">
                                Ver Detalles →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="card dark:bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    Resumen Financiero
                  </h3>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">
                        Facturación Anual
                      </span>
                      <span className="font-bold">
                        ${(companyData.annualRevenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">
                        Préstamos Activos
                      </span>
                      <span className="font-bold">
                        {loans.filter((l) => l.status === "active").length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">
                        Total Financiado
                      </span>
                      <span className="font-bold">
                        $
                        {(
                          loans.reduce((acc, l) => acc + l.amount, 0) / 1000
                        ).toFixed(0)}
                        K
                      </span>
                    </div>
                    <div className="divider divider-accent my-2"></div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">
                        Límite Disponible
                      </span>
                      <span className="font-bold text-success">$2.5M</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card dark:bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    Estado de la Cuenta
                  </h3>
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Verificado</p>
                        <p className="text-sm opacity-70">
                          Cuenta completamente verificada
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Documentación Completa</p>
                        <p className="text-sm opacity-70">
                          Todos los documentos aprobados
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Historial Limpio</p>
                        <p className="text-sm opacity-70">Sin pagos en mora</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
