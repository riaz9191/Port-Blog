import TextReveal from "../components/edil-ozi/text-reveal";

const InfiniteTextDemo = () => {
  const paragraph = "Inspiring Minds, One Post at a Time.";

  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg   dark:">
      <TextReveal paragraph={paragraph} />
    </div>
  );
};

export default InfiniteTextDemo;
