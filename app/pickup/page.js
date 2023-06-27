import React from 'react'

import { getWebsiteData } from '@/util/util'

import PickupDeliveryPage from '@/components/PickupDeliveryPage'

export const revalidate = 3600 * 3 // revalidate every 3 hours

const page = async () => {

  const DATA = await getWebsiteData();

  return (
    <PickupDeliveryPage DATA={DATA} type="pickup" />
  )
}

export default page