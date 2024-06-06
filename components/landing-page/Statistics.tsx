import { getAllProductsCount } from "@/lib/productaction";
import { getAllUsersCount } from "@/lib/useraction";

export const Statistics = async () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const productsCount = await getAllProductsCount()
  const usersCount = (await getAllUsersCount()).toString()

  const stats: statsProps[] = [
    {
      quantity: `${usersCount}`,
      description: "Users",
    },
    {
      quantity: `${productsCount}`,
      description: "Products",
    },
    {
      quantity: "soon",
      description: "Downloads",
    },
    {
      quantity: "6",
      description: "Entwickler",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
