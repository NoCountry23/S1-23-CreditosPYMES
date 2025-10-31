// lib/schedule.ts

export const round2 = (x: number) => Math.round(x * 100) / 100;

export const calculateMonthlyPayment = (principal: number, tna: number, n: number) => {
  const rate = tna / 12; // 0.45/12
  const payment = (principal * (rate * Math.pow(1 + rate, n))) / (Math.pow(1 + rate, n) - 1);
  return round2(payment); // <- 2 decimales, no entero
};

const addMonthsKeepDay = (d: Date, m: number) => {
  const x = new Date(d);
  const day = x.getDate();
  x.setMonth(x.getMonth() + m);
  if (x.getDate() < day) x.setDate(0); // ajuste fin de mes
  return x;
};

export function buildInstallments(params: {
    principal: number; // prestamos.monto
    tna: number;       // prestamos.interes (0.45)
    n: number;         // prestamos.cant_cuo
    confirmedAt: Date;
    firstDueDate?: Date; // opcional
}) {
  const { principal, tna, n, confirmedAt, firstDueDate } = params;
  const rate = tna / 12;
  const payment = calculateMonthlyPayment(principal, tna, n);

  let balance = principal;
  let due = firstDueDate ?? addMonthsKeepDay(confirmedAt, 1);
  const cuotas: Array<{
        numero_cuota: number;
        fecha_vencimiento: string; // YYYY-MM-DD
        amount: number;
        interest: number;
        principal_comp: number;
        balance: number;
        status: string;
    }> = [];

  for (let k = 1; k <= n; k++) {
    const interest = balance * rate;
    const capital = payment - interest;
    const isLast = k === n;
    const principalAdj = isLast ? balance : capital;
    const amount = isLast ? (interest + principalAdj) : payment;
    const newBalance = balance - principalAdj;

    cuotas.push({
      numero_cuota: k,
      fecha_vencimiento: due.toISOString().slice(0, 10),
      amount: round2(amount),
      interest: round2(interest),
      principal_comp: round2(principalAdj),
      balance: round2(Math.max(newBalance, 0)),
      status: "pendiente",
    });

    balance = newBalance;
    due = addMonthsKeepDay(due, 1);
  }

  return { payment, cuotas };
}
