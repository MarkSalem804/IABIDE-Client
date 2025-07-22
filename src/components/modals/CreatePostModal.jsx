/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, title, children, padding = true }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className={`bg-white shadow-2xl w-full max-w-5xl max-h-[99vh] min-h-[90vh] relative flex flex-col ${
            padding ? "p-12" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
          {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool,
};

export default Modal;
