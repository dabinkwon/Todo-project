import { useFetch } from "../custom-hooks/useFetch";

export const Advice = () => {
  const [data, loading] = useFetch(
    "https://korean-advice-open-api.vercel.app/api/advice"
  );

  return (
    <>
      {loading ?
      (<div className="flex flex-col justify-center items-center gap-2 font-[monospace] mt-2.5 w-[600px]">
        <p>...Loading</p>
      </div>)
      : (
        <div className="flex flex-col justify-center items-center gap-2 font-[monospace] mt-2.5 w-[600px]">
          <p className="text-sm">{data.message}</p>
          <p>- {data.author} -</p>
        </div>
      )}
    </>
  );
};
