import { useEffect, useState } from "react";
import { UTM_KEYS, getUtm, type UtmFields } from "@/lib/utm";

/**
 * Hidden form fields carrying the visitor's utm_* values (filled after mount so
 * prerendered HTML and hydration match). The submit handlers send getUtm() in
 * the Formspree payload; these inputs mirror it in the DOM.
 */
const UtmHiddenFields = () => {
  const [utm, setUtm] = useState<UtmFields | null>(null);
  useEffect(() => setUtm(getUtm()), []);
  return (
    <>
      {UTM_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} value={utm?.[k] ?? ""} readOnly />
      ))}
    </>
  );
};

export default UtmHiddenFields;
