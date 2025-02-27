"use client";

export interface PageHeaderProps {
  title: string;
  addTilte?: string;
  onAdd?: (...args: any) => any;
}

const PageHeader = ({ title, addTilte, onAdd }: PageHeaderProps) => {
  return (
    <section className="bg-primary-100 space-y-6 p-6 sm:px-10 sm:py-8 lg:p-6 xl:px-10 xl:py-8 ">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-primary-900 tracking-wide">
          {title}
        </h2>
        {onAdd && (
          <button
            onClick={() => onAdd?.()}
            className="flex items-center rounded-lg bg-primary-600 text-primary-100 text-sm font-medium px-4 py-2 hover:bg-primary-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            {addTilte ?? ""}
          </button>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
