"use server";

export async function trustpilotReview(domain: string) {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Basic ${process.env.DATA_FOR_SEO_KEY}`,
    },
  };

  const taskRes = await fetch(
    "https://api.dataforseo.com/v3/business_data/trustpilot/reviews/task_post",
    {
      method: "POST",
      body: JSON.stringify([
        {
          domain: domain,
          depth: 20,
          priority: 2,
        },
      ]),
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${process.env.DATA_FOR_SEO_KEY}`,
      },
    }
  );
  const task = await taskRes.json();

  await new Promise((resolve) => setTimeout(resolve, 8000));

  const res = await fetch(
    "https://api.dataforseo.com/v3/business_data/trustpilot/reviews/task_get/" +
      task.tasks[0].id,
    options
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  if (res.tasks_error !== 0) {
    await new Promise((resolve) => setTimeout(resolve, 12000));

    const res = await fetch(
      "https://api.dataforseo.com/v3/business_data/trustpilot/reviews/task_get/" +
        task.tasks[0].id,
      options
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));

    if (res.tasks_error !== 0) {
      await new Promise((resolve) => setTimeout(resolve, 20000));

      const res = await fetch(
        "https://api.dataforseo.com/v3/business_data/trustpilot/reviews/task_get/" +
          task.tasks[0].id,
        options
      )
        .then((res) => res.json())
        .catch((error) => console.log(error));

      return { res };
    } else {
      return { res };
    }
  } else {
    return { res };
  }
}
