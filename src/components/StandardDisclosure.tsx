// Standard page footer disclosure adopted by compliance on Oct 23, 2026
// (/workspace/compliance/records/2026-10/2026-10-23_pre-move-pages-review.md).
// Do not edit the wording without compliance review.
export const STANDARD_DISCLOSURE =
  "Aliya Financial LLC is registered as an investment adviser with the New Jersey Bureau of Securities. Registration does not imply a certain level of skill or training. Investing involves risk, including loss of principal. This content is educational and general in nature. It is not tax, legal, or individualized investment advice. Aliya Financial LLC is not licensed in Israel and does not give Israeli tax advice. US citizens owe US tax on worldwide income wherever they live. Michael Benklifa is also a licensed insurance agent; any insurance is offered separately, may pay him a commission, and carries no advisory fee.";

const StandardDisclosure = () => (
  <div className="py-6 bg-white border-t border-border">
    <div className="container mx-auto px-4">
      <p className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">{STANDARD_DISCLOSURE}</p>
    </div>
  </div>
);

export default StandardDisclosure;
