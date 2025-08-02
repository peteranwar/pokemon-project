import { useNavigate, useParams } from 'react-router-dom';
import ErrorDisplay from '../components/shared/ErrorDisplay';
import MainButton from '../components/shared/MainButton';
import SkeletonCard from '../components/shared/SkeletonCard';
import { usePokemon } from '../services/pokemon/query';

const PokemonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch } = usePokemon(id!);

  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full">
        <SkeletonCard />
        <p className="mt-4">Loading Pokémon details...</p>
      </div>
    );
  }

  if (isError) {
    return <ErrorDisplay message={error?.message} onRetry={refetch} />;
  }

  return (
    <div className="">
      <MainButton variant='outline' onClick={() => navigate(-1)}>
        Go Back
      </MainButton>

    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-4">
      <h1 className="text-3xl font-bold capitalize mb-4 text-center bg-gradient-to-r from-[#D9B5FF] to-[#9BE9FE] 
      py-4">
        {data?.name}
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8 p-6">
        <img
          src={data?.sprites.front_default}
          alt={data?.name}
          className="w-48 h-48 object-contain"
        />
        <div className="space-y-4">
          <p><strong>ID:</strong> {data?.id}</p>
          <p><strong>Height:</strong> {data?.height&& Number(data?.height / 10).toFixed(2)} m</p>
          <p><strong>Weight:</strong> {data?.weight && Number(data?.weight / 10).toFixed(2)} kg</p>
          <p>
            <strong>Types:</strong>{' '}
            {data?.types.map(t => t.type.name).join(', ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PokemonDetailPage;