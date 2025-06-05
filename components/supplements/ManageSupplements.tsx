'use client';

import { motion} from 'framer-motion';
import Header from './Header';
import SupplementInput from './SupplementInput';
import MySupplements from './MySupplements';

const ManageSupplements = () => {

  return (
    <div className="min-h-screen text-white px-6 py-10 w-full">
      {/* <div className='w-screen vita-background'></div> */}
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto mb-10"
      >
        <h2 className="text-xl font-semibold text-orange-400 mb-1">Add New Supplement</h2>
        <p className="text-sm text-gray-400 mb-6">Enter supplement details and optionally auto-categorize.</p>
        <SupplementInput />
      </motion.div>
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto  shadow-lg p-6 rounded-2xl shadow-gray-900">
            <h2 className="text-xl font-semibold text-orange-400 mb-1">My Supplements</h2>
            <p className="text-sm text-gray-400 mb-4">Your organized supplement schedule.</p>
        <MySupplements />
        </motion.div>
    </div>
  );
};

export default ManageSupplements;
