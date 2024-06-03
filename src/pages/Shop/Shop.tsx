import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import Catalog from '@/pages/Shop/Catalog/Catalog';

export default function Shop() {
  return (
    <>
      <PageHeader title="Katalog" navigations={['Home', 'Shop']} />
      <Catalog />
    </>
  );
}
