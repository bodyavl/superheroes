import s from "./Info.module.scss";

const Info = () => {
  return (
    <section className={s.container}>
      <h1 className={s.title}>Superheroes</h1>
      <article className={s.description}>
        Create your own collection of superheroes and share it with your
        friends.
      </article>
    </section>
  );
};

export default Info;
