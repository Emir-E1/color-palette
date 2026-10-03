function PageHeader({ title, description }) {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    </header>
  );
}

export default PageHeader;
