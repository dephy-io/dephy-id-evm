CREATE MIGRATION m1gper5o2mu5jygvbr2nrbt7o454v6hwsf3lx6n6firnnkyg2xml6q
    ONTO m1midfflttspyeivubawnvdrrovsdiyeneeqrasrlxonmx5jqimb6q
{
  ALTER TYPE default::Product {
      CREATE PROPERTY devices_count := (std::count(.devices));
  };
  ALTER TYPE default::ProductFactory {
      CREATE PROPERTY devices_count := (std::count(.products.devices));
      CREATE PROPERTY products_count := (std::count(.products));
      CREATE PROPERTY vendors := (DISTINCT (.products.vendor));
      CREATE PROPERTY vendors_count := (std::count(.vendors));
  };
};
