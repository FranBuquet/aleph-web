export async function createAlephSubscription(
  phone: string,
  name: string,
  email: string
): Promise<string> {
  const res = await fetch("https://api.mercadopago.com/preapproval", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reason: "Aleph — Plan mensual",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 9900,
        currency_id: "ARS",
        free_trial: { frequency: 7, frequency_type: "days" },
      },
      payer_email: email,
      back_url: `${process.env.NEXT_PUBLIC_URL}/gracias`,
      external_reference: `${phone}|${name}`,
      notification_url: `${process.env.BOT_URL}/mp-webhook`,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`MP error ${res.status}: ${err}`);
  }

  const data = await res.json() as { init_point?: string };
  if (!data.init_point) throw new Error("MP no devolvió init_point");
  return data.init_point;
}
