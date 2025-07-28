const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-dashboard/10 px-4 py-2">
    <span className="text-lg font-bold text-dashboard">{children}</span>
  </div>
);

export default SectionTitle;
