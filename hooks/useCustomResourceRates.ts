import { useEffect, useState } from "react";
import { supabase } from "@/lib/supaBaseClient";
import { RoleRate } from "@/common";

export function useCustomResourceRates() {
  const [data, setData] = useState<RoleRate[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.from("role_rates").select(`
          id,
          intermediate_rate,
          advanced_rate,
          expert_rate,
          roles (id, name),
          regions (id, name)
        `);

      if (error) {
        setError(error.message);
        setData(null);
      } else {
        setData(data as unknown as RoleRate[]);
      }

      setLoading(false);
    };

    fetchRates();
  }, []);

  return { data, loading, error };
}
