"use server";

export async function googleReview(id: string) {
  //   const browserLang = navigator.language;

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
          //   priority: 2,
          location_name: "United Kingdom",
          language_name: "Polish",
        },
      ]),
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${process.env.DATA_FOR_SEO_KEY}`,
      },
    }
  );
  const task = await taskRes.json();

  console.log(task);
  await new Promise((resolve) => setTimeout(resolve, 10000));

  //   const compleatedTasks = await fetch(
  //     "https://api.dataforseo.com/v3/business_data/google/reviews/tasks_ready",
  //     options
  //   );
  //   const formatedTasks = await compleatedTasks.json();

  //   const isTaskCreated = await formatedTasks.tasks[0].result.find(
  //     (el: any) => el.id === task.tasks[0].id
  //   );

  //   console.log(formatedTasks.tasks[0].result);
  //   console.log(task.tasks[0].id);

  const res = await fetch(
    "https://api.dataforseo.com/v3/business_data/google/reviews/task_get/" +
      task.tasks[0].id,
    options
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return { success: true, res };
}
