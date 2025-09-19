#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
루이비통 그림 모음 PDF에서 이미지를 추출하여 JPG 파일로 저장하는 스크립트
"""

import os
import sys
from pathlib import Path
from PIL import Image
import fitz  # PyMuPDF
import io

def extract_images_from_pdf(pdf_path, output_dir="louis_vuitton_images"):
    """
    PDF 파일에서 이미지를 추출하여 JPG로 저장
    
    Args:
        pdf_path (str): PDF 파일 경로
        output_dir (str): 출력 디렉토리
    """
    
    # 출력 디렉토리 생성
    os.makedirs(output_dir, exist_ok=True)
    
    # PDF 파일 열기
    try:
        pdf_document = fitz.open(pdf_path)
        print(f"PDF 파일을 성공적으로 열었습니다. 총 {len(pdf_document)} 페이지")
        
        image_count = 0
        
        # 각 페이지를 순회
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]
            print(f"\n페이지 {page_num + 1} 처리 중...")
            
            # 페이지에서 이미지 목록 가져오기
            image_list = page.get_images()
            print(f"페이지 {page_num + 1}에서 {len(image_list)}개의 이미지를 발견했습니다.")
            
            # 각 이미지 처리
            for img_index, img in enumerate(image_list):
                try:
                    # 이미지 데이터 추출
                    xref = img[0]
                    pix = fitz.Pixmap(pdf_document, xref)
                    
                    # 이미지가 CMYK인 경우 RGB로 변환
                    if pix.n - pix.alpha < 4:  # GRAY or RGB
                        img_data = pix.tobytes("png")
                    else:  # CMYK: convert to RGB first
                        pix1 = fitz.Pixmap(fitz.csRGB, pix)
                        img_data = pix1.tobytes("png")
                        pix1 = None
                    
                    # PIL Image로 변환
                    img_pil = Image.open(io.BytesIO(img_data))
                    
                    # JPG로 저장
                    output_filename = f"louis_vuitton_page_{page_num + 1}_image_{img_index + 1}.jpg"
                    output_path = os.path.join(output_dir, output_filename)
                    
                    # RGB 모드로 변환 (JPG는 RGB만 지원)
                    if img_pil.mode != 'RGB':
                        img_pil = img_pil.convert('RGB')
                    
                    img_pil.save(output_path, "JPEG", quality=95)
                    print(f"  이미지 저장: {output_filename}")
                    image_count += 1
                    
                    pix = None  # 메모리 해제
                    
                except Exception as e:
                    print(f"  이미지 {img_index + 1} 처리 중 오류: {e}")
                    continue
        
        pdf_document.close()
        print(f"\n총 {image_count}개의 이미지를 추출했습니다.")
        print(f"출력 디렉토리: {os.path.abspath(output_dir)}")
        
    except Exception as e:
        print(f"PDF 파일 처리 중 오류 발생: {e}")
        return False
    
    return True

def main():
    pdf_path = "images/루이비통그림모음.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"PDF 파일을 찾을 수 없습니다: {pdf_path}")
        return
    
    print(f"PDF 파일: {pdf_path}")
    print("루이비통 이미지 추출을 시작합니다...")
    
    success = extract_images_from_pdf(pdf_path)
    
    if success:
        print("\n루이비통 이미지 추출이 완료되었습니다!")
    else:
        print("\n이미지 추출 중 오류가 발생했습니다.")

if __name__ == "__main__":
    main()
