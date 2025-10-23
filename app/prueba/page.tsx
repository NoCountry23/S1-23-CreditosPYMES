'use client';

import { toast } from 'react-toastify';

export default function PruebaPage() {
  const handleSave = () => {
    toast.success("Perfil actualizado correctamente");
  };

  return (
    <div className="p-4">
      <button onClick={handleSave} className="btn btn-primary">
        Guardar cambios
      </button>
    </div>
  );
}
