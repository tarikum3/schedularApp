'use client';



export interface PageHeaderProps {
  title: string;
  addTilte?: string;
  onAdd?:(...args:any)=>any;
  
}

const PageHeader = ({ title, addTilte,onAdd  }: PageHeaderProps) => {
 

  return (
    <section className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
 

 <div className="flex items-center justify-between">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      {onAdd&&<a onClick={()=>onAdd||null} className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
        <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
        {addTilte??""}
      </a>}
    </div>
    </section>
  );
};

export default PageHeader;