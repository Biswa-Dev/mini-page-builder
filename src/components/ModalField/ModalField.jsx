import React, { forwardRef } from 'react';
import styles from './ModalField.module.css';

const ModalField = forwardRef(({ title, type}, ref) => {
  return (
    <div className={styles.modalField}>
        <span className={styles.title}>{title}</span>
        <input 
            className={styles.inputField} 
            type={type}
            ref={ref}
        />
    </div>
  )
})

export default ModalField;