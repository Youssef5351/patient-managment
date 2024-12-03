import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import elkoumi from "../assets/Elkoumi.jpg";

const TreatmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  const [medicinesList, setMedicinesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [showPrescription, setShowPrescription] = useState(false);

  const [treatment, setTreatment] = useState({
    patientId: patient?._id || '',
    patientName: patient?.name || '',
    patientAge: patient?.age || '',
    symptoms: patient?.symptoms || '',
    medicine1: '',
    dosage1: '',
    medicine2: '',
    dosage2: '',
    medicine3: '',
    dosage3: '',
    medicine4: '',
    dosage4: '',
    medicine5: '',
    dosage5: '',
    treatmentDate: new Date().toISOString().split('T')[0]
  });

  // Redirect if no patient data
  useEffect(() => {
    if (!patient) {
      setErrorMessage('No patient data found');
      setTimeout(() => {
        navigate('/doctor');
      }, 3000);
    }
  }, [patient, navigate]);

  const dosageList = [
    // Tablets (قرص)
      { value: 'قرص بعد الفطار', label: 'قرص بعد الفطار' },
      { value: 'قرص بعد الغذاء', label: 'قرص بعد الغذاء' },
      { value: 'قرص بعد العشاء', label: 'قرص بعد العشاء' },
      { value: 'قرص قبل النوم', label: 'قرص قبل النوم' },
      { value: 'قرص في الصباح', label: 'قرص في الصباح' },
      { value: 'قرص في المساء', label: 'قرص في المساء' },
      { value: 'قرص كل 12 ساعة', label: 'قرص كل 12 ساعة' },
      { value: 'قرص كل 24 ساعة', label: 'قرص كل 24 ساعة' },
      { value: 'قرص كل يوم', label: 'قرص كل يوم' },
      { value: 'قرص يوم بعد يوم', label: 'قرص يوم بعد يوم' },
      { value: 'قرص 3 مرات يومياً', label: 'قرص 3 مرات يومياً' },
      { value: 'قرص 4 مرات يومياً', label: 'قرص 4 مرات يومياً' },
      { value: 'قرص عند الحاجة', label: 'قرص عند الحاجة' },
      { value: 'قرص عند اللزوم', label: 'قرص عند اللزوم' },
      { value: 'قرص قبل الفطار والعشاء', label: 'قرص قبل الفطار والعشاء' },
      { value: 'قرص بعد الفطار والعشاء', label: 'قرص بعد الفطار والعشاء' },
      { value: 'قرص قبل النوم حسب الحاجة', label: 'قرص قبل النوم حسب الحاجة' },
      { value: 'قرص في وقت الألم', label: 'قرص في وقت الألم' },
      { value: 'قرص صباحاً ومساءً', label: 'قرص صباحاً ومساءً' },
      { value: 'قرص كل يومين', label: 'قرص كل يومين' },
      { value: 'قرص للأطفال يومياً', label: 'قرص للأطفال يومياً' },
      { value: 'قرص للأطفال مرتين يومياً', label: 'قرص للأطفال مرتين يومياً' },
      { value: 'قرص للكبار يومياً', label: 'قرص للكبار يومياً' },
      { value: 'قرص للكبار مرتين يومياً', label: 'قرص للكبار مرتين يومياً' },
      { value: 'قرص كل 3 أيام', label: 'قرص كل 3 أيام' },
      { value: 'قرص كل أسبوع', label: 'قرص كل أسبوع' },
      { value: 'قرص عند الضرورة', label: 'قرص عند الضرورة' },

    // Syrup (شراب)
    { value: 'ملعقة بعد الفطار', label: 'ملعقة بعد الفطار' },
    { value: 'ملعقة بعد الغذاء', label: 'ملعقة بعد الغذاء' },
    { value: 'ملعقة بعد العشاء', label: 'ملعقة بعد العشاء' },
    { value: 'ملعقة قبل النوم', label: 'ملعقة قبل النوم' },
    { value: 'ملعقة في الصباح', label: 'ملعقة في الصباح' },
    { value: 'ملعقة في المساء', label: 'ملعقة في المساء' },
    { value: 'ملعقة كل 12 ساعة', label: 'ملعقة كل 12 ساعة' },
    { value: 'ملعقة كل 24 ساعة', label: 'ملعقة كل 24 ساعة' },
    { value: 'ملعقة كل يوم', label: 'ملعقة كل يوم' },
    { value: 'ملعقة يوم بعد يوم', label: 'ملعقة يوم بعد يوم' },
    { value: 'ملعقة 3 مرات يومياً', label: 'ملعقة 3 مرات يومياً' },
    { value: 'ملعقة 4 مرات يومياً', label: 'ملعقة 4 مرات يومياً' },
    { value: 'ملعقة عند الحاجة', label: 'ملعقة عند الحاجة' },
    { value: 'ملعقة عند اللزوم', label: 'ملعقة عند اللزوم' },
    { value: 'ملعقة قبل الفطار والعشاء', label: 'ملعقة قبل الفطار والعشاء' },
    { value: 'ملعقة بعد الفطار والعشاء', label: 'ملعقة بعد الفطار والعشاء' },
    { value: 'ملعقة قبل النوم حسب الحاجة', label: 'ملعقة قبل النوم حسب الحاجة' },
    { value: 'ملعقة في وقت الألم', label: 'ملعقة في وقت الألم' },
    { value: 'ملعقة صباحاً ومساءً', label: 'ملعقة صباحاً ومساءً' },
    { value: 'ملعقة كل يومين', label: 'ملعقة كل يومين' },
    { value: 'ملعقة للأطفال يومياً', label: 'ملعقة للأطفال يومياً' },
    { value: 'ملعقة للأطفال مرتين يومياً', label: 'ملعقة للأطفال مرتين يومياً' },
    { value: 'ملعقة للكبار يومياً', label: 'ملعقة للكبار يومياً' },
    { value: 'ملعقة للكبار مرتين يومياً', label: 'ملعقة للكبار مرتين يومياً' },
    { value: 'ملعقة كل 3 أيام', label: 'ملعقة كل 3 أيام' },
    { value: 'ملعقة كل أسبوع', label: 'ملعقة كل أسبوع' },
    { value: 'ملعقة عند الضرورة', label: 'ملعقة عند الضرورة' },

    // Effervescent (فوار)
    { value: 'كيس بعد الفطار', label: 'كيس بعد الفطار' },
    { value: 'كيس بعد الغذاء', label: 'كيس بعد الغذاء' },
    { value: 'كيس بعد العشاء', label: 'كيس بعد العشاء' },
    { value: 'كيس قبل النوم', label: 'كيس قبل النوم' },
    { value: 'كيس في الصباح', label: 'كيس في الصباح' },
    { value: 'كيس في المساء', label: 'كيس في المساء' },
    { value: 'كيس كل 12 ساعة', label: 'كيس كل 12 ساعة' },
    { value: 'كيس كل 24 ساعة', label: 'كيس كل 24 ساعة' },
    { value: 'كيس كل يوم', label: 'كيس كل يوم' },
    { value: 'كيس يوم بعد يوم', label: 'كيس يوم بعد يوم' },
    { value: 'كيس 3 مرات يومياً', label: 'كيس 3 مرات يومياً' },
    { value: 'كيس 4 مرات يومياً', label: 'كيس 4 مرات يومياً' },
    { value: 'كيس عند الحاجة', label: 'كيس عند الحاجة' },
    { value: 'كيس عند اللزوم', label: 'كيس عند اللزوم' },
    { value: 'كيس قبل الفطار والعشاء', label: 'كيس قبل الفطار والعشاء' },
    { value: 'كيس بعد الفطار والعشاء', label: 'كيس بعد الفطار والعشاء' },
    { value: 'كيس قبل النوم حسب الحاجة', label: 'كيس قبل النوم حسب الحاجة' },
    { value: 'كيس في وقت الألم', label: 'كيس في وقت الألم' },
    { value: 'كيس صباحاً ومساءً', label: 'كيس صباحاً ومساءً' },
    { value: 'كيس كل يومين', label: 'كيس كل يومين' },
    { value: 'كيس للأطفال يومياً', label: 'كيس للأطفال يومياً' },
    { value: 'كيس للأطفال مرتين يومياً', label: 'كيس للأطفال مرتين يومياً' },
    { value: 'كيس للكبار يومياً', label: 'كيس للكبار يومياً' },
    { value: 'كيس للكبار مرتين يومياً', label: 'كيس للكبار مرتين يومياً' },
    { value: 'كيس كل 3 أيام', label: 'كيس كل 3 أيام' },
    { value: 'كيس كل أسبوع', label: 'كيس كل أسبوع' },
    { value: 'كيس عند الضرورة', label: 'كيس عند الضرورة' },
    { value: 'كيس علي نصف كوب ماء مرتين يومياً', label: 'كيس علي نصف كوب ماء مرتين يومياً' },
    { value: 'كيس علي نصف كوب ماء ثلاث مرات يومياً', label: 'كيس علي نصف كوب ماء ثلاث مرات يومياً' },
    { value: 'كيس علي نصف كوب ماء مرة يومياً', label: 'كيس علي نصف كوب ماء مرة يومياً' },

    // Injections (حقن)
    { value: 'حقنة بعد الفطار', label: 'حقنة بعد الفطار' },
    { value: 'حقنة بعد الغذاء', label: 'حقنة بعد الغذاء' },
    { value: 'حقنة بعد العشاء', label: 'حقنة بعد العشاء' },
    { value: 'حقنة قبل النوم', label: 'حقنة قبل النوم' },
    { value: 'حقنة في الصباح', label: 'حقنة في الصباح' },
    { value: 'حقنة في المساء', label: 'حقنة في المساء' },
    { value: 'حقنة كل يوم', label: 'حقنة كل يوم' },
    { value: 'حقنة يوم بعد يوم', label: 'حقنة يوم بعد يوم' },
    { value: 'حقنة 3 مرات في الأسبوع', label: 'حقنة 3 مرات في الأسبوع' },
    { value: 'حقنة كل أسبوع', label: 'حقنة كل أسبوع' },
    { value: 'حقنة 3 مرات يومياً', label: 'حقنة 3 مرات يومياً' },
    { value: 'حقنة 4 مرات يومياً', label: 'حقنة 4 مرات يومياً' },
    { value: 'حقنة عند الحاجة', label: 'حقنة عند الحاجة' },
    { value: 'حقنة عند اللزوم', label: 'حقنة عند اللزوم' },
    { value: 'حقنة في وقت الألم', label: 'حقنة في وقت الألم' },
    { value: 'حقنة في الليل حسب الحاجة', label: 'حقنة في الليل حسب الحاجة' },
    { value: 'حقنة في الصباح والمساء', label: 'حقنة في الصباح والمساء' },
    { value: 'حقنة للأطفال يومياً', label: 'حقنة للأطفال يومياً' },
    { value: 'حقنة للأطفال مرتين يومياً', label: 'حقنة للأطفال مرتين يومياً' },
    { value: 'حقنة للكبار يومياً', label: 'حقنة للكبار يومياً' },
    { value: 'حقنة كل شهر', label: 'حقنة كل شهر' },
    { value: 'حقنة حسب الحاجة كل أسبوع', label: 'حقنة حسب الحاجة كل أسبوع' },
    { value: 'حقنة كل 3 أيام', label: 'حقنة كل 3 أيام' },

    { value: 'أمبولة بعد الفطار', label: 'أمبولة بعد الفطار' },
    { value: 'أمبولة بعد الغذاء', label: 'أمبولة بعد الغذاء' },
    { value: 'أمبولة بعد العشاء', label: 'أمبولة بعد العشاء' },
    { value: 'أمبولة قبل النوم', label: 'أمبولة قبل النوم' },
    { value: 'أمبولة في الصباح', label: 'أمبولة في الصباح' },
    { value: 'أمبولة في المساء', label: 'أمبولة في المساء' },
    { value: 'أمبولة كل يوم', label: 'أمبولة كل يوم' },
    { value: 'أمبولة يوم بعد يوم', label: 'أمبولة يوم بعد يوم' },
    { value: 'أمبولة 3 مرات في الأسبوع', label: 'أمبولة 3 مرات في الأسبوع' },
    { value: 'أمبولة كل أسبوع', label: 'أمبولة كل أسبوع' },
    { value: 'أمبولة 3 مرات يومياً', label: 'أمبولة 3 مرات يومياً' },
    { value: 'أمبولة 4 مرات يومياً', label: 'أمبولة 4 مرات يومياً' },
    { value: 'أمبولة عند الحاجة', label: 'أمبولة عند الحاجة' },
    { value: 'أمبولة عند اللزوم', label: 'أمبولة عند اللزوم' },
    { value: 'أمبولة في وقت الألم', label: 'أمبولة في وقت الألم' },
    { value: 'أمبولة في الليل حسب الحاجة', label: 'أمبولة في الليل حسب الحاجة' },
    { value: 'أمبولة في الصباح والمساء', label: 'أمبولة في الصباح والمساء' },
    { value: 'أمبولة للأطفال يومياً', label: 'أمبولة للأطفال يومياً' },
    { value: 'أمبولة للأطفال مرتين يومياً', label: 'أمبولة للأطفال مرتين يومياً' },
    { value: 'أمبولة للكبار يومياً', label: 'أمبولة للكبار يومياً' },
    { value: 'أمبولة كل شهر', label: 'أمبولة كل شهر' },
    { value: 'أمبولة حسب الحاجة كل أسبوع', label: 'أمبولة حسب الحاجة كل أسبوع' },
    { value: 'أمبولة كل 3 أيام', label: 'أمبولة كل 3 أيام' },

    // Drops (قطرات)
    { value: 'قطرة بعد الفطار', label: 'قطرة بعد الفطار' },
    { value: 'قطرة بعد الغذاء', label: 'قطرة بعد الغذاء' },
    { value: 'قطرة بعد العشاء', label: 'قطرة بعد العشاء' },
    { value: 'قطرة قبل النوم', label: 'قطرة قبل النوم' },
    { value: 'قطرة في الصباح', label: 'قطرة في الصباح' },
    { value: 'قطرة في المساء', label: 'قطرة في المساء' },
    { value: 'قطرة كل يوم', label: 'قطرة كل يوم' },
    { value: 'قطرة يوم بعد يوم', label: 'قطرة يوم بعد يوم' },
    { value: 'قطرة 3 مرات في الأسبوع', label: 'قطرة 3 مرات في الأسبوع' },
    { value: 'قطرة كل أسبوع', label: 'قطرة كل أسبوع' },
    { value: 'قطرة 3 مرات يومياً', label: 'قطرة 3 مرات يومياً' },
    { value: 'قطرة 4 مرات يومياً', label: 'قطرة 4 مرات يومياً' },
    { value: 'قطرة عند الحاجة', label: 'قطرة عند الحاجة' },
    { value: 'قطرة عند اللزوم', label: 'قطرة عند اللزوم' },
    { value: 'قطرة في وقت الألم', label: 'قطرة في وقت الألم' },
    { value: 'قطرة في الليل حسب الحاجة', label: 'قطرة في الليل حسب الحاجة' },
    { value: 'قطرة في الصباح والمساء', label: 'قطرة في الصباح والمساء' },
    { value: 'قطرة للأطفال يومياً', label: 'قطرة للأطفال يومياً' },
    { value: 'قطرة للأطفال مرتين يومياً', label: 'قطرة للأطفال مرتين يومياً' },
    { value: 'قطرة للكبار يومياً', label: 'قطرة للكبار يومياً' },
    { value: 'قطرة كل شهر', label: 'قطرة كل شهر' },
    { value: 'قطرة حسب الحاجة كل أسبوع', label: 'قطرة حسب الحاجة كل أسبوع' },
    { value: 'قطرة كل 3 أيام', label: 'قطرة كل 3 أيام' },

    // Creams (كريمات)
    { value: 'كريم صباحاً ومساءً', label: 'كريم صباحاً ومساءً' },
    { value: 'كريم مرة يومياً', label: 'كريم مرة يومياً' },
    { value: 'كريم مرتين يومياً', label: 'كريم مرتين يومياً' },

    // Ointments (مرهم)
    { value: 'مرهم صباحاً ومساءً', label: 'مرهم صباحاً ومساءً' },
    { value: 'مرهم مرتين يومياً', label: 'مرهم مرتين يومياً' },
    { value: 'مرهم مرة واحدة يومياً', label: 'مرهم مرة واحدة يومياً' },

    // Suspensions (معلق)
    { value: 'معلق 3 مرات يومياً', label: 'معلق 3 مرات يومياً' },
    { value: 'معلق مرة واحدة يومياً', label: 'معلق مرة واحدة يومياً' },

    // Suppositories (لبوس)
    { value: 'لبوس قبل النوم', label: 'لبوس قبل النوم' },
    { value: 'لبوس بعد الفطار', label: 'لبوس بعد الفطار' },
    { value: 'لبوس بعد الغذاء', label: 'لبوس بعد الغذاء' },
    { value: 'لبوس بعد العشاء', label: 'لبوس بعد العشاء' },
    { value: 'لبوس كل 12 ساعة', label: 'لبوس كل 12 ساعة' },
    { value: 'لبوس كل يوم', label: 'لبوس كل يوم' },
    { value: 'لبوس 3 مرات يومياً', label: 'لبوس 3 مرات يومياً' },
    { value: 'لبوس يوم بعد يوم', label: 'لبوس يوم بعد يوم' },
    { value: 'لبوس عند اللزوم', label: 'لبوس عند اللزوم' },
    { value: 'لبوس مرة واحدة يومياً', label: 'لبوس مرة واحدة يومياً' },
    { value: 'لبوس مرة واحدة كل 3 أيام', label: 'لبوس مرة واحدة كل 3 أيام' },
    { value: 'لبوس صباحاً ومساءً', label: 'لبوس صباحاً ومساءً' },
    { value: 'لبوس كل 48 ساعة', label: 'لبوس كل 48 ساعة' },
    { value: 'لبوس قبل النوم حسب الحاجة', label: 'لبوس قبل النوم حسب الحاجة' },
    { value: 'لبوس قبل الفطار والعشاء', label: 'لبوس قبل الفطار والعشاء' },
    { value: 'لبوس في وقت الألم', label: 'لبوس في وقت الألم' },
    { value: 'لبوس عند الضرورة', label: 'لبوس عند الضرورة' },
    { value: 'لبوس للأطفال مرة واحدة يومياً', label: 'لبوس للأطفال مرة واحدة يومياً' },
    { value: 'لبوس للأطفال مرتين يومياً', label: 'لبوس للأطفال مرتين يومياً' },
    { value: 'لبوس للكبار مرة واحدة يومياً', label: 'لبوس للكبار مرة واحدة يومياً' },
    { value: 'لبوس للكبار مرتين يومياً', label: 'لبوس للكبار مرتين يومياً' },

    // Miscellaneous
    { value: 'محلول للغرغرة 3 مرات يومياً', label: 'محلول للغرغرة 3 مرات يومياً' },
    { value: 'شامبو مرة كل يومين', label: 'شامبو مرة كل يومين' },
    { value: 'بخاخ مرتين يومياً', label: 'بخاخ مرتين يومياً' },
    { value: 'مسحوق يخلط حسب التوجيه', label: 'مسحوق يخلط حسب التوجيه' },
    { value: 'محلول يستخدم حسب التوجيه', label: 'محلول يستخدم حسب التوجيه' },

    // Combination (تركيبة)
    { value: 'تركيبة ثلاثية: قرص صباحاً ومساءً', label: 'تركيبة ثلاثية: قرص صباحاً ومساءً' },
    { value: 'تركيبة صباحاً ومساءً حسب التوجيه', label: 'تركيبة صباحاً ومساءً حسب التوجيه' }
];



  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
      borderRadius: '0.5rem',
      borderColor: '#374151',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#4b5563'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
      border: '1px solid #374151'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#7c3aed' 
        : state.isFocused 
          ? '#374151' 
          : '#1f2937',
      color: '#e5e7eb',
      '&:active': {
        backgroundColor: '#7c3aed'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e5e7eb'
    }),
    input: (provided) => ({
      ...provided,
      color: '#e5e7eb'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af'
    })
  };

useEffect(() => {
  const fetchMedicines = async () => {
    try {
      console.log('Fetching medicines from:', 'https://patient-managment-backend.vercel.app/api/medicines');
      const response = await axios.get('https://patient-managment-backend.vercel.app/api/medicines');
      console.log('Response data:', response.data);
      const options = response.data.map((medicine) => ({
        value: medicine.id,
        label: medicine.name
      }));
      setMedicinesList(options);
    } catch (error) {
      console.error('Full error details:', error);
      setErrorMessage(`فشل في جلب الأدوية: ${error.message}`);
    }
  };
  fetchMedicines();
}, []);

  const handleSelectChange = (selectedOption, { name }) => {
    setTreatment((prevTreatment) => ({
      ...prevTreatment,
      [name]: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post('https://patient-managment-backend.vercel.app/api/treatment/add', treatment);
      setSuccessMessage('تم حفظ خطة العلاج بنجاح!');
      setShowPrescription(true);
    } catch (error) {
      setErrorMessage('فشل في إرسال بيانات العلاج');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = async () => {
    // Trigger print dialog
    window.print();
  
    // Set up the event listener for after printing
    window.onafterprint = async () => {
      console.log('Patient ID to delete:', patient._id);
  
      try {
        const response = await axios.delete(
          `https://patient-managment-backend.vercel.app/api/patients/${encodeURIComponent(patient._id)}`
        );
  
        // Redirect to the doctor page after successful deletion
        window.location.href = '/doctor';
      } catch (error) {
        console.error('Error deleting patient data:', error);
        alert(
          error.response?.data?.message ||
          'Failed to delete patient data. Please check the logs.'
        );
      }
    };
  };
  
  

  const handleNewPrescription = () => {
    setShowPrescription(false);
    setTreatment({
      medicine1: '',
      dosage1: '',
      medicine2: '',
      dosage2: '',
      medicine3: '',
      dosage3: '',
      medicine4: '',
      dosage4: '',
      medicine5: '',
      dosage5: '',
      treatmentDate: new Date().toISOString().split('T')[0]
    });
    setSuccessMessage('');
  };

  const renderMedicineSection = (number) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1 font-cairo">
          الدواء {number}
        </label>
        <Select
          name={`medicine${number}`}
          options={medicinesList}
          onChange={handleSelectChange}
          value={medicinesList.find((option) => option.value === treatment[`medicine${number}`]) || null}
          isClearable
          styles={customSelectStyles}
          placeholder="اختر الدواء..."
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          الجرعة {number}
        </label>
        <Select
          name={`dosage${number}`}
          options={dosageList}
          onChange={handleSelectChange}
          value={dosageList.find((option) => option.value === treatment[`dosage${number}`]) || null}
          isClearable
          styles={customSelectStyles}
          placeholder="اختر الجرعة..."
          className="mt-1"
        />
        
      </div>
    </div>
  );

  if (showPrescription) {
    return (
      <div className="min-h-screen p-6 bg-gray-900 text-gray-100 font-cairo">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ height: '842px' }}>
            <img 
              src={elkoumi} 
              alt="Prescription Background" 
              className="w-[40rem] h-full object-contain"
            />
            
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between p-8">
              {/* Patient Info */}
              <div className="text-center mt-16">
                <p className="text-gray-800 mb-2 ml-[5.5rem] text-lg absolute mt-32">
                  {new Date(treatment.treatmentDate).toLocaleDateString('ar-EG')}
                </p>
                <p className="text-gray-800 mt-20 ml-[18rem] text-lg absolute">{treatment.patientName}</p>
                <p className="text-gray-800 ml-32 mt-[5.25rem] text-lg absolute">{treatment.patientAge}</p>
                <p className="text-gray-800 text-lg mt-[7.75rem] ml-[5.5rem] pl-[13rem] absolute">{treatment.symptoms}</p>
              </div>

              {/* Medicines */}
              <div className="flex-grow mt-60 ml-12 space-y-3">
  {[1, 2, 3, 4, 5].map((num) => {
    if (treatment[`medicine${num}`] && treatment[`dosage${num}`]) {
      return (
        <div key={num} className="text-gray-800 text-2xl space-y-1 text-left font-roboto">
          <span className="block">
            {medicinesList.find(m => m.value === treatment[`medicine${num}`])?.label}
          </span>
          <span className="block text-lg text-black ml-20 font-tajawal">
            {treatment[`dosage${num}`]}
          </span>
        </div>
      );
    }
    return null;
  })}
</div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/20"
            >
              طباعة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 font-cairo">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 text-center">خطة علاج جديدة</h2>
        <p className="mt-2 text-center text-gray-400">
          أضف تفاصيل الأدوية للعلاج
        </p>
      </div>

      {/* Patient Information Display */}
      <div className="max-w-2xl mx-auto mb-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium text-gray-200 mb-3">معلومات المريض</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <span className="font-medium">الاسم:</span> {treatment.patientName}
          </div>
          <div>
            <span className="font-medium">العمر:</span> {treatment.patientAge}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 text-green-200 rounded-lg">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="flex space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 
                ${activeSection === num 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveSection(num)}
            >
              الدواء {num}
            </button>
          ))}
        </div>

        {renderMedicineSection(activeSection)}

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            تاريخ العلاج
          </label>
          <input
            type="date"
            value={treatment.treatmentDate}
            onChange={(e) => setTreatment({ ...treatment, treatmentDate: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg text-white font-medium transition-transform duration-200 
            transform hover:scale-[1.02] ${isSubmitting 
              ? 'bg-violet-600/50 cursor-not-allowed' 
              : 'bg-violet-600 hover:bg-violet-700 active:scale-[0.98] shadow-lg shadow-violet-500/20'}`}
        >
          {isSubmitting ? 'جارٍ الحفظ...' : 'حفظ خطة العلاج'}
        </button>
      </form>
    </div>
  );
};

export default TreatmentForm;
