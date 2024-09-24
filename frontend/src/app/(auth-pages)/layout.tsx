export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='max-w-screen-xl flex flex-col gap-12 items-start mx-auto py-4'>
      {children}
    </div>
  );
}

