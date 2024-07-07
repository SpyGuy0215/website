export default function MdxLayout({children}, type='info') {
    return (
        <div className="bg-slate-100 pt-10 min-h-screen pb-10">
            <div className={'w-10/12 md:w-7/12 mx-auto'}>
                {children}
            </div>
        </div>
    )
}