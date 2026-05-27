export default function AdminDashboard() {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-3">
              Total Orders
            </p>
  
            <h2 className="text-4xl font-bold">
              120
            </h2>
          </div>
  
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-3">
              Total Users
            </p>
  
            <h2 className="text-4xl font-bold">
              42
            </h2>
          </div>
  
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-3">
              Products
            </p>
  
            <h2 className="text-4xl font-bold">
              84
            </h2>
          </div>
  
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-3">
              Revenue
            </p>
  
            <h2 className="text-4xl font-bold">
              ₹85K
            </h2>
          </div>
        </div>
      </div>
    );
  }