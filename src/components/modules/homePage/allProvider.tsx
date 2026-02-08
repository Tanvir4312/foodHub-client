import { providerServices } from "@/services/provider.services";

import { ProviderType } from "@/types/provider.type";

import ProviderCard from "./homePageCards/provider";

const AllProvider = async () => {
  const { data } = await providerServices.getProviderService();

  const providers = data?.data;

  // Filter available providers
  const availableProviders = providers.filter(
    (p: ProviderType) => p.isAvailable === true,
  );

  return (
    <div>
      {availableProviders.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
              <span className="text-3xl font-bold mx-3">
                {availableProviders?.length}
              </span>{" "}
              Restaurants Available Now
            </h2>
          </div>
        </div>
      )}

      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black text-gray-900 leading-tight">
          THE BEST KITCHENS <br className="hidden md:block" /> IN YOUR CITY
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl text-lg">
          Experience authentic flavors delivered straight to your door from our
          handpicked partner restaurants.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {providers.map((provider: ProviderType) => {
          return (
            <ProviderCard key={provider.id} provider={provider}></ProviderCard>
          );
        })}
      </div>
    </div>
  );
};

export default AllProvider;
