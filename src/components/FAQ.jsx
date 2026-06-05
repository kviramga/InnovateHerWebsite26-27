import React, { useState } from 'react'
import './FAQ.css'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'What is InnovateHer?',
      answer: 'InnovateHer is a community for women in technology and innovation.',
    },
    {
      id: 2,
      question: 'How can I get involved?',
      answer: 'You can join us by signing up on our website or attending our events.',
    },
    {
      id: 3,
      question: 'Are there membership fees?',
      answer: 'No, membership is completely free and open to all.',
    },
    {
      id: 4,
      question: 'When do you meet?',
      answer: 'We meet regularly throughout the year. Check our events page for details.',
    },
  ]

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
