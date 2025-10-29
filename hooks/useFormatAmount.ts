export default function useFormatAmount (amount: number) {
  return amount.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}