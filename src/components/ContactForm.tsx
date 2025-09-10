import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

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

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo no es válido.";
    }

    // Phone (solo validar si tiene algo escrito)
    if (formData.phone.trim()) {
      if (!/^\d{8,15}$/.test(formData.phone)) {
        newErrors.phone =
          "El teléfono debe tener solo números (8 a 15 dígitos).";
      }
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Formulario enviado:", formData);

    // limpiar formulario después de enviar
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="liquid-effect p-4 font-semibold mt-14 w-full max-w-[590px] mx-auto"
    >
      {/* Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-text-secundary">Name*</label>
        <input
          className="liquid-effect py-2 px-3"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ingresa nombre"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-sm text-text-secundary">Email*</label>
        <input
          className="liquid-effect py-2 px-3"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-sm text-text-secundary">Phone Number</label>
        <input
          className="liquid-effect py-2 px-3"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Ingresa tu número de teléfono"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Message */}
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-sm text-text-secundary">Message*</label>
        <textarea
          className="liquid-effect py-2 px-3 min-h-[150px] resize-none"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escribe tu mensaje"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary mt-6 text-white rounded-[24px] w-full py-3"
      >
        Enviar
      </button>
    </form>
  );
};
