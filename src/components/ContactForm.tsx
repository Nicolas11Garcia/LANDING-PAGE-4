import { useState, type ChangeEvent, type FormEvent } from "react";
import { BASE_URL } from "../constant/BaseURL";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

type AlertState = {
  type: "success" | "error";
  message: string;
} | null;

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [alert, setAlert] = useState<AlertState>(null);
  const [loading, setLoading] = useState(false); // 👈 estado loading

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    // Company
    if (!formData.company.trim()) {
      newErrors.company = "La empresa es obligatoria.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo no es válido.";
    }

    // Phone (obligatorio y 9 dígitos)
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = "El teléfono debe tener solo números (9 dígitos).";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setAlert(null);

    setLoading(true);

    try {
      const payload = {
        ...formData,
        phone: formData.phone ? `+56${formData.phone}` : "",
      };

      const response = await fetch(BASE_URL + "/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // 👈 envías los datos del formulario
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();

      // limpiar formulario
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});

      // mostrar alerta de éxito
      setAlert({
        type: "success",
        message: "Tu formulario ha sido enviado correctamente.",
      });
    } catch (err) {
      console.error(err);

      // mostrar alerta de error
      setAlert({
        type: "error",
        message:
          "Hubo un problema al enviar el formulario. Inténtalo nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="liquid-effect p-4 font-semibold mt-14 w-full max-w-[590px] mx-auto"
    >
      {/* Nombre */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-text-secundary">Nombre*</label>
        <input
          className="liquid-effect py-2 px-3"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={25}
          placeholder="Ingresa nombre"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Empresa */}
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-sm text-text-secundary">Empresa*</label>
        <input
          className="liquid-effect py-2 px-3"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          maxLength={50}
          placeholder="Ingresa empresa"
        />
        {errors.company && (
          <p className="text-red-500 text-sm">{errors.company}</p>
        )}
      </div>

      {/* Correo Electrónico */}
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-sm text-text-secundary">
          Correo Electrónico*
        </label>
        <input
          className="liquid-effect py-2 px-3"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          maxLength={90}
          placeholder="Ingresa correo electrónico"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Número de Teléfono */}
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-sm text-text-secundary">
          Número de Teléfono*
        </label>
        <input
          className="liquid-effect py-2 px-3"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          maxLength={9}
          placeholder="Ingresa tu número de teléfono"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Mensaje */}
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-sm text-text-secundary">Mensaje*</label>
        <textarea
          className="liquid-effect py-2 px-3 min-h-[150px] resize-none"
          name="message"
          value={formData.message}
          onChange={handleChange}
          maxLength={250}
          placeholder="Escribe tu mensaje"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      {/* Alerta de éxito o error */}
      {alert && (
        <div
          className={`p-3 mt-6 rounded-md text-sm ${
            alert.type === "success"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading} // 👈 evita enviar dos veces
        className={`bg-primary mt-6 text-white rounded-[24px] w-full py-3 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Enviando..." : "Enviar"} {/* 👈 texto dinámico */}
      </button>
    </form>
  );
};
