import { AddressGoogleMapInputPropsType, AddressType, SignUpFormType, SitterSignUpFormType } from '@/types/types';
import React, { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';


const AddressGoogleMapInput = ({setAddress, register, errors} : AddressGoogleMapInputPropsType) => {
    const [validatorVariable, setValidatorVariable] = useState<boolean | null>(null)
    
    const {
        ready,
        value,
        setValue,
        suggestions:{
            status,
            data
        },
        clearSuggestions
    } = usePlacesAutocomplete()

    const checkStatus = ():boolean => {
        if (validatorVariable) {
            return true
        }
        return false
    }

    const handlePlacesClick = async(val: string) => {
        setValue(val, false)
        clearSuggestions()
        const result = await getGeocode({address: val})
        const {lat, lng} = await getLatLng(result[0])
        if(status === 'OK') { setValidatorVariable(true)
        return setAddress({
            address: val,
            latLng: {
              lat:lat,
              lng:lng
            }
          })}
    }

    return (
        <>
            <input
            type='text'
            {...register('fullAddress', {
                required: true,
                validate: checkStatus,
            })}
            disabled={!ready}
            name='fullAddress'
            className='p-2 w-full sm:w-96  text-lg'
            value={value} 
            onChange={e=> {
                setValue(e.target.value)
            }}
            placeholder='Domicilio...'
            />
            {errors.fullAddress?.type === 'required' && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>Debe ingresar domicilio</p>
          )}
            {(errors.fullAddress?.type === 'validate' && !validatorVariable) && (
            <p className='text-white bg-red-500 self-start p-2 rounded-md text-start '>No se encontro el domicilio</p>
          )}
            <>
            {
                data.length === 0 && status === 'OK' ? 
                    <div>
                      No se encontraron resultados...
                    </div> : status === 'OK' && <> {data.map(({place_id, description})=> (
                        <div key={place_id} className='px-2 py-1 border-b-black self-start border-b cursor-pointer hover:bg-white/25' onClick={(e)=> handlePlacesClick(description)}>
                            {description}
                        </div>

                   ))}</> 
            }
        </>
        </>
    )
}

export default AddressGoogleMapInput