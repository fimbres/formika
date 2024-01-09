import React, { Suspense } from 'react'
import { CrumpledPaperIcon, EyeOpenIcon, PaperPlaneIcon, RocketIcon } from '@radix-ui/react-icons';

import { GetAllForms, GetFormStats } from '@/actions/form'
import StatCard from '@/components/stat-card';
import { Separator } from '@/components/ui/separator';
import CreateFormButton from '@/components/create-form-button';
import FormCard from '@/components/form-card';
import { Skeleton } from '@/components/ui/skeleton';

async function Home() {
  return (
    <main className='max-w-2xl w-full mx-auto'>
      <h1 className='text-4xl font-semibold mt-8'>Welcome to Formika</h1>
      <p className='mt-2 text-gray-400'>Build forms without the tears!</p>
      <Suspense fallback={<StatsCards loading={true} />}>
        {/* @ts-expect-error Server Component */}
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-4xl font-bold col-span-2'>Your forms</h2>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2'>
        <Suspense fallback={[1, 2, 3].map((number) => <Skeleton key={number} className='h-[190px] w-full rounded-md' />)}>
          {/* @ts-expect-error Server Component */}
          <CardFormsWrapper />
        </Suspense>
        <CreateFormButton />
      </div>
    </main>
  )
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />
}

async function CardFormsWrapper() {
  const forms = await GetAllForms();

  return (
    <>
      {forms.map((form, index) => (
        <FormCard
          key={index}
          form={form}
        />
      ))}
    </>
  );
}

interface StatsCardsProps {
  loading: boolean;
  data?: Awaited<ReturnType<typeof GetFormStats>>
};

function StatsCards(props: StatsCardsProps){
  const { data, loading } = props;
  const stats = [
    {
      title: 'Total Visits',
      description: 'All form visits',
      icon: <EyeOpenIcon />,
      value: data?.visits.toLocaleString()
    },
    {
      title: 'Total Submissions',
      description: 'All form submissions',
      icon: <PaperPlaneIcon />,
      value: data?.submissions.toLocaleString()
    },
    {
      title: 'Submission rate',
      description: 'Visits that result in form submission',
      icon: <RocketIcon />,
      value: data?.visits.toLocaleString() + "%"
    },
    {
      title: 'Bounce rate',
      description: 'Visits that leave without interaction',
      icon: <CrumpledPaperIcon />,
      value: data?.visits.toLocaleString() + "%"
    },
  ];

  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2'>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          description={stat.description}
          icon={stat.icon}
          loading={loading}
          value={stat.value}
        />
      ))}
    </div>
  );
}

export default Home
