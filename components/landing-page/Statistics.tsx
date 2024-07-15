import { getAllProductsCount } from "@/lib/product-actions";
import { getAllUsersCount } from "@/lib/user-actions";
import { getTranslations } from "next-intl/server";

export const Statistics = async () => {

  const t = await getTranslations("Statistics");
  interface statsProps {
    quantity: string;
    description: string;
  }

  const productsCount = await getAllProductsCount()
  const usersCount = (await getAllUsersCount()).toString()

  const stats: statsProps[] = [
    {
      quantity: `${usersCount}`,
      description: t("users"),
    },
    {
      quantity: `${productsCount}`,
      description: "Bitz",
    },
    {
      quantity: t('downloads.soon'),
      description: "Downloads",
    },
    {
      quantity: "6",
      description: t('devs'),
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
