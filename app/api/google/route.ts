import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");
  //   const browserLang = navigator.language;

  //   const taskRes = await fetch(
  //     "https://api.dataforseo.com/v3/business_data/google/reviews/task_post",
  //     {
  //       method: "POST",
  //       body: JSON.stringify([
  //         {
  //           place_id: placeId,
  //           depth: 10,
  //           //   priority: 2,
  //           location_name: "Poland",
  //           language_name: "Polish",
  //         },
  //       ]),
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization:
  //           "Basic amFrdWJrb21vcm93c2tpNUB3cC5wbDo3ODJjN2Q1ZWYyNjNjYTQ0",
  //       },
  //     }
  //   );
  //   const task = await taskRes.json();

  //   console.log(task);

  //   const res = await fetch(
  //     "https://api.dataforseo.com/v3/business_data/google/reviews/task_get/" +
  //       task.tasks[0].id,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization:
  //           "Basic amFrdWJrb21vcm93c2tpNUB3cC5wbDo3ODJjN2Q1ZWYyNjNjYTQ0",
  //       },
  //     }
  //   );
  //   const json = await res.json();

  //   console.log(json);

  const res = await fetch(
    "https://api.dataforseo.com/v3/business_data/google/reviews/task_get/05302317-7881-0298-0000-19894401907e",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization:
          "Basic amFrdWJrb21vcm93c2tpNUB3cC5wbDo3ODJjN2Q1ZWYyNjNjYTQ0",
      },
    }
  );
  const json = await res.json();

  console.log(json);

  return new Response(JSON.stringify({ data: json }));
}
