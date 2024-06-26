"use server";

export async function amazonReview(domain: string, lang?: string) {
  const req = await fetch(
    `https://api.app.outscraper.com/amazon/reviews?query=${domain}&limit=3`,
    {
      headers: {
        "X-API-KEY": `${process.env.OUTSCRAPER_KEY}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  await new Promise((resolve) => setTimeout(resolve, 8000));

  const res = await fetch(`https://api.app.outscraper.com/requests/${req.id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  if (res.status === "Pending") {
    await new Promise((resolve) => setTimeout(resolve, 12000));
    const res = await fetch(`https://api.app.outscraper.com/requests/${req.id}`)
      .then((res) => res.json())
      .catch((error) => console.log(error));

    return { res };
  } else {
    return { res };
  }
}
