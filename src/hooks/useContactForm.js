// useContactForm.js - Enhanced version
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';

/**
 * Enhanced contact form hook with advanced validation and UX features
 * @param {object} initial - initial form values
 * @param {object} options - configuration options
 * @param {function} options.onSubmit - custom submit handler
 * @param {function} options.onSuccess - success callback
 * @param {function} options.onError - error callback
 * @param {number} options.successTimeout - how long to show success message (ms)
 * @param {boolean} options.enableRealTimeValidation - validate on field change
 * @param {object} options.customValidators - custom validation functions
 * @returns {object} form state and handlers
 */
export default function useContactForm(initial = {}, options = {}) {
  const {
    onSubmit = null,
    onSuccess = null,
    onError = null,
    successTimeout = 5000,
    enableRealTimeValidation = false,
    customValidators = {}
  } = options;

  // Form state
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    subject: 'General Inquiry',
    newsletter: false,
    ...initial,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [submitError, setSubmitError] = useState(null);

  // Refs for managing timers and focus
  const successTimeoutRef = useRef(null);
  const formRef = useRef(null);

  // Field update handler
  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }

    // Real-time validation
    if (enableRealTimeValidation && touched[name]) {
      setTimeout(() => {
        const fieldErrors = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
      }, 300); // Debounce validation
    }
  }, [errors, submitError, enableRealTimeValidation, touched]);

  // Field touch handler
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  // Field blur handler
  const handleFieldBlur = useCallback((name) => {
    setFieldTouched(name, true);
    
    // Validate field on blur
    const fieldErrors = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, ...fieldErrors }));
  }, [values, setFieldTouched]);

  // Enhanced validation function
  const validateField = useCallback((fieldName, fieldValue) => {
    const errors = {};
    const value = fieldValue?.toString().trim() || '';

    switch (fieldName) {
      case 'firstName':
        if (!value) {
          errors.firstName = 'First name is required';
        } else if (value.length < 2) {
          errors.firstName = 'First name must be at least 2 characters';
        } else if (value.length > 50) {
          errors.firstName = 'First name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          errors.firstName = 'First name contains invalid characters';
        }
        break;

      case 'lastName':
        if (!value) {
          errors.lastName = 'Last name is required';
        } else if (value.length < 2) {
          errors.lastName = 'Last name must be at least 2 characters';
        } else if (value.length > 50) {
          errors.lastName = 'Last name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          errors.lastName = 'Last name contains invalid characters';
        }
        break;

      case 'email':
        if (!value) {
          errors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else if (value.length > 254) {
          errors.email = 'Email address is too long';
        }
        break;

      case 'phone':
        if (value && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(value)) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;

      case 'company':
        if (value && value.length > 100) {
          errors.company = 'Company name must be less than 100 characters';
        }
        break;

      case 'message':
        if (!value) {
          errors.message = 'Message is required';
        } else if (value.length < 10) {
          errors.message = 'Message must be at least 10 characters';
        } else if (value.length > 1000) {
          errors.message = 'Message must be less than 1000 characters';
        }
        break;

      case 'subject':
        if (!value) {
          errors.subject = 'Subject is required';
        }
        break;

      default:
        break;
    }

    // Apply custom validators
    if (customValidators[fieldName]) {
      const customError = customValidators[fieldName](fieldValue, values);
      if (customError) {
        errors[fieldName] = customError;
      }
    }

    return errors;
  }, [values, customValidators]);

  // Validate entire form
  const validate = useCallback((formValues = values) => {
    const allErrors = {};

    // Validate each field
    Object.keys(formValues).forEach((fieldName) => {
      const fieldErrors = validateField(fieldName, formValues[fieldName]);
      Object.assign(allErrors, fieldErrors);
    });

    return allErrors;
  }, [values, validateField]);

  // Check if form is valid
  const isValid = useMemo(() => {
    const formErrors = validate();
    return Object.keys(formErrors).length === 0;
  }, [validate]);

  // Get field error
  const getFieldError = useCallback((fieldName) => {
    return touched[fieldName] ? errors[fieldName] : undefined;
  }, [errors, touched]);

  // Check if field is valid
  const isFieldValid = useCallback((fieldName) => {
    return touched[fieldName] && !errors[fieldName];
  }, [errors, touched]);

  // Submit handler
  const handleSubmit = useCallback(async (customOnSubmit) => {
    setSubmitAttempts((prev) => prev + 1);
    
    // Mark all fields as touched
    const allFieldNames = Object.keys(values);
    const touchedState = {};
    allFieldNames.forEach((name) => {
      touchedState[name] = true;
    });
    setTouched(touchedState);

    // Validate form
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      // Focus first error field
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
      }
      
      return { ok: false, errors: formErrors };
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      // Use custom submit handler or default one
      const submitHandler = customOnSubmit || onSubmit;
      const result = submitHandler ? await Promise.resolve(submitHandler(values)) : { success: true };

      if (result?.success !== false) {
        setSubmitted(true);
        
        // Call success callback
        if (onSuccess) {
          onSuccess(result, values);
        }

        // Auto-hide success message
        if (successTimeout > 0) {
          successTimeoutRef.current = setTimeout(() => {
            setSubmitted(false);
          }, successTimeout);
        }

        return { ok: true, result };
      } else {
        throw new Error(result?.message || 'Submission failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      setSubmitError(errorMessage);
      
      // Call error callback
      if (onError) {
        onError(error, values);
      }

      return { ok: false, error: errorMessage };
    } finally {
      setSubmitting(false);
    }
  }, [values, validate, onSubmit, onSuccess, onError, successTimeout]);

  // Reset form
  const reset = useCallback(() => {
    setValues({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      subject: 'General Inquiry',
      newsletter: false,
      ...initial,
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSubmitAttempts(0);
    setSubmitError(null);
    
    // Clear success timeout
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  }, [initial]);

  // Clear success message manually
  const clearSuccess = useCallback(() => {
    setSubmitted(false);
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  // Pre-populate fields from URL params or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const subjectParam = urlParams.get('subject');
    
    if (emailParam || subjectParam) {
      setValues((prev) => ({
        ...prev,
        ...(emailParam && { email: emailParam }),
        ...(subjectParam && { subject: subjectParam }),
      }));
    }
  }, []);

  return {
    // Form state
    values,
    errors,
    touched,
    isValid,
    submitting,
    submitted,
    submitAttempts,
    submitError,
    
    // Form handlers
    setField,
    setFieldTouched,
    handleFieldBlur,
    handleSubmit,
    reset,
    clearSuccess,
    
    // Validation utilities
    validate,
    validateField,
    getFieldError,
    isFieldValid,
    
    // Form reference
    formRef,
    
    // Computed values
    hasErrors: Object.keys(errors).length > 0,
    isDirty: Object.keys(touched).length > 0,
    submitCount: submitAttempts,
    
    // Field status helpers
    getFieldProps: (fieldName) => ({
      name: fieldName,
      value: values[fieldName] || '',
      onChange: (e) => setField(fieldName, e.target.value),
      onBlur: () => handleFieldBlur(fieldName),
      'aria-invalid': !!getFieldError(fieldName),
      'aria-describedby': getFieldError(fieldName) ? `${fieldName}-error` : undefined,
    }),
    
    // Subject options for dropdown
    subjectOptions: [
      'General Inquiry',
      'Office Space Rental',
      'Meeting Room Booking',
      'Virtual Office Services',
      'Pricing Information',
      'Tour Request',
      'Partnership Opportunities',
      'Technical Support',
      'Other'
    ]
  };
}