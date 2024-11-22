// Settings.jsx
import React, { useState } from 'react';
import s from './Settings.module.css'; // This should be your styles file

const Settings = () => {
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    description: ''
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement submit functionality
    console.log(formData);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <p className={s.title}>Settings</p>
      <section className={s.container}>
      <div className={s.card}>
        <div className={s.cardDetails}>
          <p className={s.textTitle}>XXXXXX</p>
        </div>
        <button className={s.cardButton}>Class code</button>
      </div>
    </section>
      <p className={s.message}>Class details</p>

        <label>
          <input
            required
            placeholder=""
            type="text"
            name="classname"
            value={formData.classname}
            onChange={handleChange}
            className={s.input}
          />
          <span>classname</span>
        </label>

        <label>
        <input
          required
          placeholder=""
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={s.input}
        />
        <span>Subject</span>
      </label>
      <label>
        <input
          required
          placeholder=""
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={s.input}
        />
        <span>Description</span>
      </label>

      <button className={s.submit}>Update</button>

    </form>
  );
};

export default Settings;
