export default function MdxLayout({children}) {
    return (
        <div className="bg-slate-100 pt-10 min-h-screen pb-10">
            <div className={'w-1/2 mx-auto'}>
                {children}
            </div>
        </div>
    )
}