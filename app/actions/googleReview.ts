"use server";

export async function googleReview(id: string, lang?: string) {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Basic ${process.env.DATA_FOR_SEO_KEY}`,
    },
  };

  const taskRes = await fetch(
    "https://api.dataforseo.com/v3/business_data/google/reviews/task_post",
    {
      method: "POST",
      body: JSON.stringify([
        {
          place_id: id,
          depth: 10,
          // priority: 2,
          location_name: "United States",
          language_code: lang ? lang : "en",
        },
      ]),
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${process.env.DATA_FOR_SEO_KEY}`,
      },
    }
  );
  const task = await taskRes.json();

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const res = await fetch(
    "https://api.dataforseo.com/v3/business_data/google/reviews/task_get/" +
      task.tasks[0].id,
    options
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  if (res.task_error !== 0) {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const res = await fetch(
      "https://api.dataforseo.com/v3/business_data/google/reviews/task_get/" +
        task.tasks[0].id,
      options
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));

    return { res };
  } else {
    return { res };
  }
}
