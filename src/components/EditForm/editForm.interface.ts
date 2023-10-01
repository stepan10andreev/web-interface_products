import { IProduct } from '@/services/products.service'
import { IAddProductFormProps } from '../AddProductForm/addProductForm.interface'

export type IEditFormProps = IProduct & IAddProductFormProps
