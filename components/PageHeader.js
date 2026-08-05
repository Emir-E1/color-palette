function PageHeader({ title, description }) {
  return (
    <header className="flex flex-col gap-2 ">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export default PageHeader;
