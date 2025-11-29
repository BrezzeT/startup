// Утиліти для роботи з профілем

export const getProfile = () => {
  const profile = localStorage.getItem('volunteerhub_profile')
  return profile ? JSON.parse(profile) : null
}

export const saveProfile = (profileData) => {
  localStorage.setItem('volunteerhub_profile', JSON.stringify(profileData))
}

export const updateProfile = (updates) => {
  const currentProfile = getProfile()
  if (currentProfile) {
    const updatedProfile = { ...currentProfile, ...updates }
    saveProfile(updatedProfile)
    return updatedProfile
  }
  return null
}

export const hasProfile = () => {
  return localStorage.getItem('volunteerhub_profile') !== null
}

export const clearProfile = () => {
  localStorage.removeItem('volunteerhub_profile')
}

