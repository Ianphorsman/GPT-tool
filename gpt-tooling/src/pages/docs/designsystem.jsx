import { useEffect, useState } from 'react'
import clsx from 'clsx'
import colors from "tailwindcss/colors"
import ImageUploader from '~/components/ImageUploader'
import { api } from '~/utils/api'
import Button from '~/components/Button/Button'

const DesignSystem = ({
  colorWeight = 950
}) => {
  const [, setData] = useState(null)
  const hello = api.example.hello.useQuery({ text: 'bar' })
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/fizzbuzz');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  const handleUpload = (imageDataUrl) => {
    // Process the image data URL as needed (e.g., upload to a server)
    console.log('Image data URL:', imageDataUrl);
  };

  const mainStyle = clsx(
    'flex', 'min-h-screen', 'flex-wrap', 'flex-row', 'items-center', 'justify-center', 'gap-4',
    'bg-gray-950'
  )

   return (
    <main className={mainStyle}>
        <p>Design System layout</p>
        {hello?.data?.greeting && <p>{hello.data.greeting}</p>}
        <ImageUploader onUpload={handleUpload} />
        <Button
            linearGradientColor={colors.emerald[colorWeight]}
            radialGradientColorFrom={colors.green[colorWeight]}
            radialGradientColorTo={colors.teal[colorWeight]}
        />
        <Button
            linearGradientColor={colors.cyan[colorWeight]}
            radialGradientColorFrom={colors.teal[colorWeight]}
            radialGradientColorTo={colors.sky[colorWeight]}
        />
        <Button />
        <Button
            linearGradientColor={colors.indigo[colorWeight]}
            radialGradientColorFrom={colors.blue[colorWeight]}
            radialGradientColorTo={colors.violet[colorWeight]}
        />
        <Button
            linearGradientColor={colors.violet[colorWeight]}
            radialGradientColorFrom={colors.indigo[colorWeight]}
            radialGradientColorTo={colors.purple[colorWeight]}
        />
        <Button
            linearGradientColor={colors.purple[colorWeight]}
            radialGradientColorFrom={colors.violet[colorWeight]}
            radialGradientColorTo={colors.fuchsia[colorWeight]}
        />
        <Button
            linearGradientColor={colors.pink[colorWeight]}
            radialGradientColorFrom={colors.fuchsia[colorWeight]}
            radialGradientColorTo={colors.rose[colorWeight]}
        />
        <Button
            linearGradientColor={colors.red[colorWeight]}
            radialGradientColorFrom={colors.rose[colorWeight]}
            radialGradientColorTo={colors.orange[colorWeight]}
        />
        <Button
            linearGradientColor={colors.orange[colorWeight]}
            radialGradientColorFrom={colors.red[colorWeight]}
            radialGradientColorTo={colors.amber[colorWeight]}
        />
        <Button
            linearGradientColor={colors.amber[colorWeight]}
            radialGradientColorFrom={colors.orange[colorWeight]}
            radialGradientColorTo={colors.yellow[colorWeight]}
        />
    </main>
   )
}

export default DesignSystem
