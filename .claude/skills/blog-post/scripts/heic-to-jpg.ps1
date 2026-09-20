# Convert HEIC photos to JPEG using built-in Windows imaging (no ImageMagick).
# Browsers other than Safari cannot display HEIC, so iPhone photos must be
# converted before they go into a post.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File heic-to-jpg.ps1 -Path public\blog\<slug>
#
# Writes <name>.jpg next to each <name>.HEIC. Delete the HEIC afterwards - the
# blog never ships two files of the same photo.

param(
  [Parameter(Mandatory = $true)][string]$Path,
  [int]$Quality = 90
)

Add-Type -AssemblyName WindowsBase
Add-Type -AssemblyName PresentationCore

Get-ChildItem -Path $Path -Filter *.heic -Recurse | ForEach-Object {
  $src = $_.FullName
  $dst = [System.IO.Path]::ChangeExtension($src, ".jpg")
  try {
    $stream = [System.IO.File]::OpenRead($src)
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
      $stream,
      [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat,
      [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
    $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
    $encoder.QualityLevel = $Quality
    $encoder.Frames.Add($decoder.Frames[0])
    $out = [System.IO.File]::Create($dst)
    $encoder.Save($out)
    $out.Close()
    $stream.Close()
    "OK   {0} -> {1} ({2}x{3})" -f $_.Name, (Split-Path $dst -Leaf), $decoder.Frames[0].PixelWidth, $decoder.Frames[0].PixelHeight
  }
  catch {
    "FAIL {0}: {1}" -f $_.Name, $_.Exception.Message
  }
}
