import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="page">
      <div className="container page__header">
        <h1 className="page__title">{t('pages.contacts.title')}</h1>
        <p className="page__subtitle">{t('pages.contacts.subtitle')}</p>
      </div>

      <div className="container contacts">
        <div className="contacts__info">
          <div className="contacts__card">
            <h3>{t('pages.contacts.address')}</h3>
            <p>г. Ташкент, ул. Навои, 15</p>
          </div>
          <div className="contacts__card">
            <h3>{t('pages.contacts.phone')}</h3>
            <p>+998 71 200 00 00</p>
          </div>
          <div className="contacts__card">
            <h3>{t('pages.contacts.email')}</h3>
            <p>info@diplom-store.uz</p>
          </div>
          <div className="contacts__card">
            <h3>{t('pages.contacts.workHours')}</h3>
            <p>Пн–Сб: 9:00 – 20:00</p>
            <p>Вс: 10:00 – 18:00</p>
          </div>
        </div>

        <form className="contacts__form" onSubmit={handleSubmit}>
          <h2 className="contacts__form-title">{t('pages.contacts.writeUs')}</h2>

          {sent && (
            <p className="contacts__success">{t('pages.contacts.success')}</p>
          )}

          <label className="contacts__label">
            <span className="contacts__label-text">{t('pages.contacts.name')}</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="contacts__input"
              placeholder={t('pages.contacts.name')}
              required
            />
          </label>

          <label className="contacts__label">
            <span className="contacts__label-text">{t('pages.contacts.email')}</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="contacts__input"
              placeholder="your@email.com"
              required
            />
          </label>

          <label className="contacts__label">
            <span className="contacts__label-text">{t('pages.contacts.message')}</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="contacts__input contacts__textarea"
              rows={5}
              placeholder={t('pages.contacts.message')}
              required
            />
          </label>

          <button type="submit" className="btn btn--primary contacts__btn">
            {t('pages.contacts.send')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacts;
